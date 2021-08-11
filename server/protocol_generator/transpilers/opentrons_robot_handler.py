class TipsWatchdog():
    """
    Used to manage Opentrons tips. Contains functions to pick up, discard, etc.
    """

    def __init__(self, pipette, tip_strategy):
        """
        Initialise the pipettes and check the tip strategy. Since this class is reinitialised
        at the start of every pipette step, it should pick up a tip if it does not have one.
        If mode is ECO - new tip, drop the current tip and take a new one.

        Tip Strategies:
        - ECO - Take a tip if needed and reuse it without ever dropping it
        - ECO - NEW TIP - Take a new tip only at the start of each new pipette step
        - STRICT - New tip for every transfer
        - STANDARD - New tip per source

        @param pipette The pipette object to manage.
        @param tip_strategy {string} The Strategy to use for managing tips
        """
        ## The active pipette
        self.pipette = pipette
        ## The Tip Strategy used for this step
        self.strategy = tip_strategy
        ## The source labware for this step
        self.source_check = None

        if self.strategy == "ECO":
            if not self.pipette.hw_pipette['has_tip']:
                self.pipette.pick_up_tip()

        if self.strategy == "ECO - NEW TIP":
            if self.pipette.hw_pipette['has_tip']:
                self.pipette.drop_tip()
            self.pipette.pick_up_tip()

    def change_tip(self, source=None):
        """
        Run before every action, check which tip strategy and if not Eco, change the tip.

        @param source From which labware the current action should source liquid
        """
        if self.strategy == "STRICT":
            if self.pipette.hw_pipette['has_tip']:
                self.pipette.drop_tip()
            self.pipette.pick_up_tip()

        if self.strategy == "STANDARD":
            if source != self.source_check:
                if self.pipette.hw_pipette['has_tip']:
                    self.pipette.drop_tip()
                self.pipette.pick_up_tip()
                self.source_check = source

    def discard(self):
        """
        Run at the end of each step, checks which tip strategy is being used.
        If not an Eco mode, will drop the current tip.
        """
        if self.strategy != "ECO" and self.strategy != "ECO - NEW TIP":
            if self.pipette.hw_pipette['has_tip']:
                self.pipette.drop_tip()


## Baud rate for Serial communication with Shaker
BAUDRATE = 9600
## Shaker Serial Port Settings
SERIALPORT = '/dev/serial/by-path/platform-3f980000.usb-usb-0:1.5:1.0-port0'
## Time of no response before serial com error is thrown
TIMEOUT = 1


class RobotHandler():
    """
    Class used for basic opentrons commands.
    """

    def __init__(self, protocol, robot_instructions):
        """
        Initialise the class members, extract the slack log webhook, and assign the labware,
        trash bin, and pipettes to their relative positions

        @param protocol The instance of the protocol API context
        @param robot_instructions The robot instructions extracted from the input json file
        """
        ##The active protocol context
        self.protocol = protocol
        ## Robot instructions from JSON
        self.instructions = robot_instructions
        self.assign_slots()
        self.assign_trash()
        self.assign_pipettes()
        self.slack_log_webhook = robot_instructions['metadata'].get(
            'slack_log_webhook')

    def assign_slots(self):
        """
        Iterate over all deck slots in the instructions file and load them into the protocol context
        """
        for slot in self.instructions['deck']['slots']:
            slotContent = self.instructions['deck']['slots'][slot]
            if slotContent:
                element = self.protocol.load_labware(slotContent['labware_id'],
                                                     slot)
                setattr(
                    self, slotContent['name'], element
                )  ## User Interface has to make sure that names don't contain space and don't end with a number

    def assign_trash(self):
        """
        Assign the trash in the protocol
        """
        setattr(self, 'trash', self.protocol.fixed_trash)

    def assign_pipettes(self):
        """
        Iterate over the pipettes in the instructions file and load them
        as instruments into the protocol context. Also load their respective tip racks
        """
        if self.instructions['deck']['left_pipette']['pipette']:
            tipracks_slots = self.instructions['deck']['left_pipette'][
                'tipracks']
            tipracks_names = [
                self.instructions['deck']['slots'][str(key)]['name']
                for key in tipracks_slots
            ]
            tipracks = [getattr(self, x) for x in tipracks_names]

            ## The left pipette of the Opentrons
            self.left_pipette = self.protocol.load_instrument(
                self.instructions['deck']['left_pipette']['pipette']['id'],
                'left',
                tip_racks=tipracks)

        if self.instructions['deck']['right_pipette']['pipette']:
            tipracks_slots = self.instructions['deck']['right_pipette'][
                'tipracks']
            tipracks_names = [
                self.instructions['deck']['slots'][str(key)]['name']
                for key in tipracks_slots
            ]
            tipracks = [getattr(self, x) for x in tipracks_names]

            ## The right pipette of the Opentrons
            self.right_pipette = self.protocol.load_instrument(
                self.instructions['deck']['right_pipette']['pipette']['id'],
                'right',
                tip_racks=tipracks)

    def get_wells(self, sources):
        """
        Get the Well locations for each source labware.

        @param sources {list} A list of the labware used as sources for the current step
        @return locations {list} A list of well locations for the given labware sources
        """
        if not isinstance(sources, list):
            sources = [sources]

        locations = []
        for slot in sources:
            element = getattr(self, slot['slot_name'])
            locations += [element.wells_by_name()[x] for x in slot['wells']]

        return locations

    def apply_offsets(self, wells, offset_type, offset_value):
        """
        Allows for the option to specify an offset for the aspirate/dispense function.

        The offset type specifies where on the well the offset should start from.
        Offset types are currently Bottom and Top.

        @param wells {list} A list of well locations for the given labware sources for which to apply the offset
        @param offset_type {string} The location on the well were the offset should originate from
        @param offset_value {float} The offset value to apply to the wells

        @return The list of wells updated with offsets
        """
        if not isinstance(wells, list):
            wells = [wells]

        if offset_type == "Bottom":
            wells = [well.bottom(float(offset_value)) for well in wells]
        else:
            wells = [well.top(float(offset_value)) for well in wells]

        return wells

    def update_flow_rate(self, pipette, liquid_class):
        """
        Used to first calculate the flow rate based on the ratio provided in the instructions file for aspirate, dispense,
        and blow_out. The absolute values of max, min, and default rate differ depending on the type of pipette used.
        Resource https://github.com/Opentrons/opentrons/blob/edge/shared-data/pipette/definitions/pipetteNameSpecs.json

        Once the absolute rate has been calculated, it is set in the pipette object ready for the transfer step.
        Note that the rates are stored/defined in the liquid class associated with the step.

        @param pipette The pipette for which to update the flow rate
        @param liquid_class Contains information on the different ratios for aspirate, dispense, blow_out rates.
        """

        def calc_rate(rate, pipette_action_type):
            if pipette_action_type == 'aspirate':
                pipette_flow_rates = name_config()[pipette.name].get(
                    'defaultAspirateFlowRate')
                if pipette_flow_rates:
                    default_rate = pipette_flow_rates['value']
                    min_rate = pipette_flow_rates['min']
                    max_rate = pipette_flow_rates['max']
                else:
                    ProtocolUtils.send_log_message(
                        "Error: Can not fetch aspirate rate from file.")

            elif pipette_action_type == 'dispense':
                pipette_flow_rates = name_config()[pipette.name].get(
                    'defaultDispenseFlowRate')
                if pipette_flow_rates:
                    default_rate = pipette_flow_rates['value']
                    min_rate = pipette_flow_rates['min']
                    max_rate = pipette_flow_rates['max']
                else:
                    ProtocolUtils.send_log_message(
                        "Error: Can not fetch dispense rate from file.")

            elif pipette_action_type == 'blow_out':
                pipette_flow_rates = name_config()[pipette.name].get(
                    'defaultBlowOutFlowRate')
                if pipette_flow_rates:
                    default_rate = pipette_flow_rates['value']
                    min_rate = pipette_flow_rates['min']
                    max_rate = pipette_flow_rates['max']
                else:
                    ProtocolUtils.send_log_message(
                        "Error: Can not fetch blow_out rate from file.")

            if rate >= 0 and rate < 1:
                return (default_rate - min_rate) * rate
            elif rate == 1:
                return default_rate
            elif rate > 1 and rate <= 2:
                return ((max_rate - default_rate) * (rate - 1)) + default_rate
            else:
                ProtocolUtils.send_log_message(
                    "Error: Rate Error, please enter proper rate")
                return None

        #END calc_rate

        #get information about the liquid_class from the protocol design
        liquid = [
            obj for obj in robot_instructions['liquid_classes'].items()
            if obj[0] == liquid_class
        ][0][1]
        aspirate_rate = liquid.get('aspirate_rate')
        if aspirate_rate:
            # print(aspirate_rate)
            pipette.flow_rate.aspirate = calc_rate(aspirate_rate, 'aspirate')

        dispense_rate = liquid.get('dispense_rate')
        if dispense_rate:
            # print(dispense_rate)
            pipette.flow_rate.dispense = calc_rate(dispense_rate, 'dispense')

        blow_out_rate = liquid.get('blow_out_rate')
        if blow_out_rate:
            # print(blow_out_rate)
            pipette.flow_rate.blow_out = calc_rate(blow_out_rate, 'blow_out')

    def simple_pipetting(self, parameters):
        """
        Stores the logic for a simple pipette step. Will prepare the step based on sources,
        offsets, destinations etc... Then run through each action transferring liquid.
        @param parameters {dictionary} The parameters for the step
        """
        pipette = getattr(self, parameters['pipette'])
        tips = TipsWatchdog(pipette, parameters['tipsStrategy'])

        volumes = parameters['volumes']

        if "source" in parameters:
            sources = self.get_wells(parameters['source'])
            destinations = self.get_wells(parameters['destination'])

        if "source_sequence" in parameters:
            srcs = self.instructions['sequences'][parameters['source_sequence']]
            sources = self.get_wells(srcs)
            dsts = self.instructions['sequences'][
                parameters['destination_sequence']]
            destinations = self.get_wells(dsts)

        if "offset" in parameters:
            sources = self.apply_offsets(sources,
                                         parameters['offset']['source_type'],
                                         parameters['offset']['source'])
            destinations = self.apply_offsets(
                destinations, parameters['offset']['destination_type'],
                parameters['offset']['destination'])

        self.update_flow_rate(pipette, parameters['liquidClass'])

        matched_iterator = match_sequences(
            volumes, sources, destinations
        )  ## User Interface has to make sure that names don't contain space and don't end with a number

        for vol, src, dst in zip(*matched_iterator):
            tips.change_tip(source=src)
            pipette.transfer(
                vol, src, dst, **robot_instructions["liquid_classes"][
                    parameters['liquidClass']])

        tips.discard()

    def array_pipetting(self, parameters):
        """
        Stores the logic for an array pipette step. Similar to simple_pipetting() except using an array map as input.
        @param parameters {dictionary} The parameters for the step
        """
        pipette = getattr(self, parameters['pipette'])
        tips = TipsWatchdog(pipette, parameters['tipsStrategy'])

        for line in parameters['array_map']:

            sourceSlot, sourceWell, destSlot, destWell, volume = line

            src = self.get_wells({
                'slot_name': sourceSlot,
                'wells': [sourceWell]
            })
            dst = self.get_wells({'slot_name': destSlot, 'wells': [destWell]})

            if "offset" in parameters:
                src = self.apply_offsets(src,
                                         parameters['offset']['source_type'],
                                         parameters['offset']['source'])
                dst = self.apply_offsets(
                    dst, parameters['offset']['destination_type'],
                    parameters['offset']['destination'])

            self.update_flow_rate(pipette, parameters['liquidClass'])
            tips.change_tip(source=src)
            pipette.transfer(
                int(volume), src, dst, **robot_instructions["liquid_classes"][
                    parameters['liquidClass']])

        tips.discard()

    def shake(self, parameters):
        """
        Stores the logic for a simple shaker step utilising the BioShake 3000t.
        Only runs during the actual protocol since a simulation would not have access to the serial ports.
        Sets the temperature and RPM setpoint and starts the system. If users set "wait_for_stop" as an
        option, the code will block until the shaker step has completed (indicated by the shaker "homing").
        Either way will stop and cool-down the shaker post completion.

        @param parameters The parameters for the step

        """
        self.custom_home()
        if not self.protocol.is_simulating():
            with serial.Serial(SERIALPORT, BAUDRATE, timeout=TIMEOUT) as ser:
                shaker = Shaker(ser)

                if parameters['tempControl']:
                    shaker.start_temp_control(int(parameters['setpoint']))

                if parameters['speed'] and parameters['duration']:
                    shaker.start_run(parameters['speed'],
                                     parameters['duration'])

                if parameters['wait_for_stop']:
                    while not shaker.is_shaker_home():
                        print(shaker.get_responses())

                if parameters['force_stop']:
                    shaker.stop()

                if parameters['cooldown']:
                    shaker.stop_temp_control()

    def custom_home(self):
        """
        Custom code for homing the gantry to ensure that the pipette tips are raised
        and will not hit any custom labware.
        """
        loc = types.Location(types.Point(350, 350, 120), None)
        if hasattr(self, 'right_pipette'):
            self.right_pipette.move_to(loc, minimum_z_height=100)
        elif hasattr(self, 'left_pipette'):
            self.left_pipette.move_to(loc, minimum_z_height=100)
        else:
            print("Error, no pipette defined for homing.")

        self.protocol.home()

    def execute_step(self, step):
        """
        Takes the input step and processes it by calling the respective function based on step type and parameters present

        @param step {dictionary} The step to be processed
        """
        self.protocol.comment('\n------------\n' + step['name'] + '\n')
        if step['type'] == "simple_transfer" or step[
                'type'] == "sequence_transfer":
            self.simple_pipetting(step['parameters'])

        elif step['type'] == "array_transfer":
            self.array_pipetting(step['parameters'])

        elif step['type'] == 'loop':
            for i in range(1, step['num_iterations'] + 1):
                self.protocol.comment('\n--' + step['name'] + ' Iteration ' +
                                      str(i) + '\n')
                for substep in step['substeps']:
                    self.execute_step(substep)

        elif step['type'] == 'pause':
            if step['auto_resume']:
                self.protocol.delay(step['pause_time'])
            else:
                self.protocol.pause()
                ProtocolUtils.send_log_message(
                    "INFO: Protocol Paused - Awaiting User Input")

        elif step['type'] == 'bioshake_3000t':
            self.shake(step['parameters'])

        elif step['type'] == 'slack_message':
            if "SLACK_MESSAGE_WEBHOOK" in globals():
                ProtocolUtils.send_slack_message(step['message'],
                                                 SLACK_MESSAGE_WEBHOOK)

        else:
            self.protocol.comment('\n------------Step type: \n' + step['type'] +
                                  ' is unknown!!!\n')
