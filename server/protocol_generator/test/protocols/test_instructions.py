robot_instructions = {
    "metadata": {
        "name":
            "test",
        "description":
            "An Initial attempt at a comprehensive OpenTrons Protocol that can be simulated or ran live to check new changes to the OpenTrons",
        "author": {
            "name": "Stefan Ionescu",
            "email": "stefan@enginzyme.com"
        },
        "is_verified":
            False,
        "is_shared":
            False,
        "created":
            1626862367051
    },
    "deck": {
        "left_pipette": {
            "pipette": {
                "name": "Single Channel 300 uL - Gen 1",
                "id": "p300_single",
                "is_multichannel": False
            },
            "tipracks": [7, 10]
        },
        "right_pipette": {
            "pipette": {
                "name": "8 Channel 300 uL - Gen 2",
                "id": "p300_multi_gen2",
                "is_multichannel": True
            },
            "tipracks": [8, 9, 11]
        },
        "slots": {
            "1": {
                "name": "shakerlabware_1",
                "labware_name": "2.0ml Eppendorfs on Al-rack on 3000T",
                "labware_type": "shakerLabware",
                "labware_id": "2.0ml_eppendorfs_on_al_rack_on_3000t",
                "nickname": "",
                "display_name": "2.0ml Eppendorfs on Al-rack on 3000T [1]",
                "id": 1
            },
            "2": {},
            "3": {},
            "4": {
                "name": "wellplate_4",
                "labware_name": "VWR 96 well-plate 2ml",
                "labware_type": "wellPlate",
                "labware_id": "vwr_96_wellplate_2.0ml",
                "nickname": "",
                "display_name": "VWR 96 well-plate 2ml [4]",
                "id": 4
            },
            "5": {
                "name": "tuberack_5",
                "labware_name": "10 Tube Rack with 4x50 mL, 6x15 mL tubes",
                "labware_type": "tubeRack",
                "labware_id": "10_tuberack_4x50ml_6x15ml",
                "nickname": "",
                "display_name": "10 Tube Rack with 4x50 mL, 6x15 mL tubes [5]",
                "id": 5
            },
            "6": {
                "name": "reservoir_6",
                "labware_name": "Brand 1x slot 220 mL",
                "labware_type": "reservoir",
                "labware_id": "brand_1x_slot_220ml",
                "nickname": "",
                "display_name": "Brand 1x slot 220 mL [6]",
                "id": 6
            },
            "7": {
                "name": "tiprack_7",
                "labware_name": "Opentrons 96 Tip Rack 0.3 mL",
                "labware_type": "tipRack",
                "labware_id": "enginzyme_96_tiprack_300ul",
                "nickname": "",
                "display_name": "Opentrons 96 Tip Rack 0.3 mL [7]",
                "id": 7
            },
            "8": {
                "name": "tiprack_8",
                "labware_name": "Opentrons 96 Tip Rack 10 \u00b5L",
                "labware_type": "tipRack",
                "labware_id": "enginzyme_96_tiprack_10ul",
                "nickname": "",
                "display_name": "Opentrons 96 Tip Rack 10 \u00b5L [8]",
                "id": 8
            },
            "9": {
                "name": "tiprack_9",
                "labware_name": "Opentrons 96 Filter Tip Rack 20 \u00b5L",
                "labware_type": "tipRack",
                "labware_id": "enginzyme_96_tiprack_20ul",
                "nickname": "",
                "display_name": "Opentrons 96 Filter Tip Rack 20 \u00b5L [9]",
                "id": 9
            },
            "10": {
                "name": "tiprack_10",
                "labware_name": "Opentrons 96 Tip Rack 0.3 mL",
                "labware_type": "tipRack",
                "labware_id": "enginzyme_96_tiprack_300ul",
                "nickname": "",
                "display_name": "Opentrons 96 Tip Rack 0.3 mL [10]",
                "id": 10
            },
            "11": {
                "name": "tiprack_11",
                "labware_name": "Opentrons 96 Tip Rack 0.3 mL",
                "labware_type": "tipRack",
                "labware_id": "enginzyme_96_tiprack_300ul",
                "nickname": "",
                "display_name": "Opentrons 96 Tip Rack 0.3 mL [11]",
                "id": 11
            },
            "12": {}
        }
    },
    "steps": [{
        "type": "slack_message",
        "name": "Slack Message",
        "id": 3,
        "substeps": [],
        "channel": "opentrons05_hercules",
        "message": "Testing OpenTrons",
        "channel_object": {
            "channel": "opentrons05_hercules"
        }
    }, {
        "type": "sequence_transfer",
        "name": "Sequence Transfer",
        "id": 2,
        "substeps": [],
        "parameters": {
            "pipette": "left_pipette",
            "pipette_obj": {
                "name": "(Left) Single Channel 300 uL - Gen 1",
                "category": "left_pipette",
                "is_multichannel": False
            },
            "pipette_strategy": "",
            "volumes": [54],
            "volumes_string": "54",
            "source_sequence": "My Test Sequence Source",
            "sourceSequenceId": 1,
            "destination_sequence": " My Test Sequence Destination",
            "destinationSequenceId": 0,
            "liquidClass": "Default",
            "liquidClassId": 0,
            "tipsStrategy": "STANDARD",
            "offset": {
                "source": 1,
                "destination": 5,
                "source_type": "Bottom",
                "destination_type": "Bottom"
            }
        }
    }, {
        "type": "pause",
        "name": "Pause User",
        "id": 1,
        "substeps": [],
        "auto_resume": False,
        "pause_time": 10
    }, {
        "type":
            "loop",
        "name":
            "Loop Shake Transfer",
        "id":
            4,
        "num_iterations":
            4,
        "substeps": [{
            "type": "bioshake_3000t",
            "name": "Bioshake 3000T",
            "id": 5,
            "substeps": [],
            "parameters": {
                "speed": 1420,
                "setpoint": 42,
                "tempControl": False,
                "cooldown": False,
                "duration": 52,
                "wait_for_stop": True,
                "force_stop": False
            }
        }, {
            "type":
                "loop",
            "name":
                "Loop Inner Transfer",
            "id":
                7,
            "num_iterations":
                3,
            "substeps": [{
                "type": "simple_transfer",
                "name": "Simple Transfer Slow",
                "id": 8,
                "substeps": [],
                "parameters": {
                    "pipette": "left_pipette",
                    "pipette_obj": {
                        "name": "(Left) Single Channel 300 uL - Gen 1",
                        "category": "left_pipette",
                        "is_multichannel": False
                    },
                    "pipette_strategy": "",
                    "volumes": [250],
                    "volumes_string": "250",
                    "source": {
                        "slot_number": 6,
                        "slot_name": "reservoir_6",
                        "wells": ["A1"]
                    },
                    "destination": {
                        "slot_number": 1,
                        "slot_name": "shakerlabware_1",
                        "wells": ["A1", "A6", "B3", "D5"]
                    },
                    "liquidClass": "Liquid Class Slow",
                    "liquidClassId": 2,
                    "tipsStrategy": "ECO",
                    "offset": {
                        "source": 1,
                        "destination": 1,
                        "source_type": "Bottom",
                        "destination_type": "Bottom"
                    }
                }
            }, {
                "type": "pause",
                "name": "Pause Auto",
                "id": 10,
                "substeps": [],
                "auto_resume": True,
                "pause_time": 54
            }, {
                "type": "simple_transfer",
                "name": "Simple Transfer Fast",
                "id": 11,
                "substeps": [],
                "parameters": {
                    "pipette": "right_pipette",
                    "pipette_obj": {
                        "name": "(Right) 8 Channel 300 uL - Gen 2",
                        "category": "right_pipette",
                        "is_multichannel": True
                    },
                    "pipette_strategy": "",
                    "volumes": [20],
                    "volumes_string": "20",
                    "source": {
                        "slot_number": 4,
                        "slot_name": "wellplate_4",
                        "wells": ["A1", "A5", "A10"]
                    },
                    "destination": {
                        "slot_number": 6,
                        "slot_name": "reservoir_6",
                        "wells": ["A1"]
                    },
                    "liquidClass": "Liquid Class Fast",
                    "liquidClassId": 1,
                    "tipsStrategy": "ECO",
                    "offset": {
                        "source": 1,
                        "destination": 1,
                        "source_type": "Bottom",
                        "destination_type": "Bottom"
                    }
                }
            }]
        }]
    }],
    "liquid_classes": {
        "Default": {
            "touch_tip": False,
            "blow_out": True,
            "carryover": True,
            "air_gap": 0,
            "blowout_location": "destination well",
            "mix_before": None,
            "mix_after": None,
            "aspirate_rate": 1,
            "dispense_rate": 1,
            "blow_out_rate": 1,
            "new_tip": "never"
        },
        "Liquid Class Fast": {
            "touch_tip": False,
            "blow_out": True,
            "blowout_location": "destination well",
            "carryover": True,
            "air_gap": 0,
            "mix_before": None,
            "mix_after": None,
            "aspirate_rate": 1.7,
            "dispense_rate": 1.6,
            "blow_out_rate": 2,
            "new_tip": "never"
        },
        "Liquid Class Slow": {
            "touch_tip": True,
            "blow_out": False,
            "blowout_location": "destination well",
            "carryover": True,
            "air_gap": 5,
            "mix_before": [1, 0],
            "mix_after": None,
            "aspirate_rate": 0.1,
            "dispense_rate": 0.2,
            "blow_out_rate": 0.5,
            "new_tip": "never"
        }
    },
    "sequences": {
        " My Test Sequence Destination": [{
            "slot_number": 4,
            "slot_name": "wellplate_4",
            "offset": {
                "offset_type": "",
                "value": 0
            },
            "wells": [
                "B2", "B9", "E7", "F1", "F2", "F3", "F4", "G1", "G2", "G3",
                "G4", "H1", "H2", "H3", "H4"
            ],
            "id": 0
        }],
        "My Test Sequence Source": [{
            "slot_number": 6,
            "slot_name": "reservoir_6",
            "offset": {
                "offset_type": "",
                "value": 0
            },
            "wells": ["A1"],
            "id": 0
        }]
    },
    "stepCounter": 12,
    "sequenceCounter": 2,
    "liquidClassCounter": 3
}
"""
Main Transpiler code-loop running pre and post protocol steps, and iterating
through all user defined steps stored in the instructions file. Initialises requred classes,
and handles major step exceptions"""
import urllib.request, json
from opentrons import protocol_api, types
from opentrons_shared_data.pipette import (model_config, name_config,
                                           fuse_specs)
import traceback
import sys
import requests, socket
import itertools
import serial, time

##General Settings for the protocol
metadata = {'apiLevel': '2.3', "transpiler_version": "210214"}
## Flag set once and provided globally to functions that can only run code when not is_simulating
IS_SIMULATING = True
## Current version of this transpiler
TRANSPILER_VERSION = "2.3.0"


def match_sequences(seq_a, seq_b, seq_c):
    """ Matching the sequences length, only works if the sequences are sub-multiples of the longest sequence"""

    maxlen = max(len(seq_a), len(seq_b), len(seq_c))

    new_seq_a = [[x] * (maxlen // len(seq_a)) for x in seq_a]
    new_seq_a = (list(itertools.chain.from_iterable(new_seq_a)))

    new_seq_b = [[x] * (maxlen // len(seq_b)) for x in seq_b]
    new_seq_b = (list(itertools.chain.from_iterable(new_seq_b)))

    new_seq_c = [[x] * (maxlen // len(seq_c)) for x in seq_c]
    new_seq_c = (list(itertools.chain.from_iterable(new_seq_c)))

    return [new_seq_a, new_seq_b, new_seq_c]


def run(protocol: protocol_api.ProtocolContext):
    """
    The main run loop, see the main page for more in depth information on
    how the tranpsiler architecture looks.
    """
    global IS_SIMULATING
    IS_SIMULATING = protocol.is_simulating()
    log_webhook = robot_instructions['metadata'].get('slack_log_webhook')
    robot_handler = RobotHandler(protocol, robot_instructions)
    protocol_handler = ProtocolHandler(protocol, robot_instructions,
                                       robot_handler)

    if protocol_handler.pre_protocol():
        for step in robot_instructions['steps']:
            try:
                robot_handler.execute_step(step)
            except Exception as ex:
                exc_type, exc_value, exc_traceback = sys.exc_info()
                protocol.comment(
                    f'ERROR: {exc_type} @ {exc_traceback.tb_lineno} - Step: {step["name"]}\n'
                )
                ProtocolUtils.send_slack_message(traceback.format_exc(),
                                                 log_webhook)

        protocol_handler.post_protocol()
        protocol_handler.upload_protocol_run()

    else:
        ProtocolUtils.send_slack_message("INFO: Protocol has Failed!",
                                         log_webhook)
        protocol_handler.upload_protocol_run(False,
                                             "Protocol Failed to run Pre Step")


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
        - ECO - Never take a new tip
        - ECO - NEW TIP - Take a new tip only at the start of each new pipette step
        - STRICT - New tip for every movement
        - STANDARD - New tip per source labware

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
                    ProtocolUtils.send_slack_message(
                        "Error: Can not fetch aspirate rate from file.",
                        self.slack_log_webhook)

            elif pipette_action_type == 'dispense':
                pipette_flow_rates = name_config()[pipette.name].get(
                    'defaultDispenseFlowRate')
                if pipette_flow_rates:
                    default_rate = pipette_flow_rates['value']
                    min_rate = pipette_flow_rates['min']
                    max_rate = pipette_flow_rates['max']
                else:
                    ProtocolUtils.send_slack_message(
                        "Error: Can not fetch dispense rate from file.",
                        self.slack_log_webhook)

            elif pipette_action_type == 'blow_out':
                pipette_flow_rates = name_config()[pipette.name].get(
                    'defaultBlowOutFlowRate')
                if pipette_flow_rates:
                    default_rate = pipette_flow_rates['value']
                    min_rate = pipette_flow_rates['min']
                    max_rate = pipette_flow_rates['max']
                else:
                    ProtocolUtils.send_slack_message(
                        "Error: Can not fetch blow_out rate from file.",
                        self.slack_log_webhook)

            if rate >= 0 and rate < 1:
                return (default_rate - min_rate) * rate
            elif rate == 1:
                return default_rate
            elif rate > 1 and rate <= 2:
                return ((max_rate - default_rate) * (rate - 1)) + default_rate
            else:
                ProtocolUtils.send_slack_message(
                    "Error: Rate Error, please enter proper rate",
                    self.slack_log_webhook)
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
        offsets, destinations etc... Then run through each action transfering liquid.
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
                ProtocolUtils.send_slack_message(
                    "INFO: Protocol Paused - Awaiting User Input",
                    self.slack_log_webhook)

        elif step['type'] == 'bioshake_3000t':
            self.shake(step['parameters'])

        elif step['type'] == 'slack_message':
            ProtocolUtils.send_slack_message(step['message'], step['webhook'])

        else:
            self.protocol.comment('\n------------Step type: \n' + step['type'] +
                                  ' is unknown!!!\n')


class ProtocolHandler():
    """
    A Class for more generic functions that apply to whole protocol
    """

    def __init__(self, protocol, robot_instructions, robot_handler):
        """
        Initialise timing variables used to track run duration, and initialise class members with protocol information.
        @param protocol The instance of the protocol API context
        @param robot_instructions The robot instructions extracted from the input json file
        @param robot_handler The instance of the robot handler used to control the Opentrons
        """
        self.robot_handler = robot_handler
        self.protocol = protocol
        self.robot_instructions = robot_instructions
        self.start_time = time.time()
        self.stop_time = time.time()
        self.elapsed_time = time.time()
        self.slack_log_webhook = robot_instructions['metadata'].get(
            'slack_log_webhook')
        self.cloud_watch_endpoint = robot_instructions['metadata'].get(
            'cloud_watch_endpoint')

    def pre_protocol(self):
        """ Runs commands at the start of every single protocol
            in order to ensure optimal functionality

            - Check if protocol is using shaker and check its connection
            - If shaker is used, check that it is working as expected see check_shaker()
            - If Successful print success message to the Slack Debug Channel

            @return True if passed else False
        """

        slots = [
            obj for obj in robot_instructions['deck'].items()
            if obj[0] == 'slots'
        ][0][1]
        shakerLabware = [
            obj for obj in slots.items()
            if obj[1].get('labware_type') == 'shakerLabware'
        ]
        if not self.protocol.is_simulating():
            if shakerLabware:
                try:
                    self.check_shaker()
                except Exception as ex:
                    template = "Exception: {0} - Arguments:\n{1!r}"
                    message = template.format(type(ex).__name__, ex.args)
                    ProtocolUtils.send_slack_message(message,
                                                     self.slack_log_webhook)
                    return False

        ProtocolUtils.send_slack_message(
            "INFO: Pre-Method Successful - Running Protocol",
            self.slack_log_webhook)
        self.start_time = time.time()
        return True

    def post_protocol(self):
        """ Commands to run at the end of every protocol

            - Calculates time_elapsed for logging purposes
            - Homes the pipette head to ensure protocol ends gracefully
            - Updates Slack with a notification the protocol has ended containing elapsed_time
        """
        self.stop_time = time.time()
        self.robot_handler.custom_home()

        self.elapsed_time = self.stop_time - self.start_time
        message = "INFO: Protocol has completed in: {}".format(
            self.elapsed_time)
        ProtocolUtils.send_slack_message(message, self.slack_log_webhook)

    def check_shaker(self):
        """ Start a run at a set Temperature to check shaker is operational

        Sends a slack message that shaker is under testing, and runs the shaker for "shaker_test_duration" (20 seconds)
        with a setpoint "shaker_setpoint_delta" (10oC) higher than the current. For the most part this should be enough for
        the shaker to heat up "temp_boundary" (3oC). If this does not happen, there is something wrong with the shaker
        and an exception will be raised.
        """
        shaker_test_RPM = 10
        shaker_test_duration = 20  #Time to run test for and allow heat up to shaker_test_temp
        temp_boundary = 3  # +/- Value in oC that the temperature is allowed to deviate
        shaker_setpoint_delta = 10.0  # Value delta to set the shaker compared to its current value
        ProtocolUtils.send_slack_message("INFO: Testing Shaker",
                                         self.slack_log_webhook)

        with serial.Serial(SERIALPORT, BAUDRATE, timeout=TIMEOUT) as ser:

            shaker = Shaker(ser)
            shaker.check_state()
            shaker_start_temp = float(shaker.get_responses()['temp='])

            shaker.start_temp_control(
                int(shaker_start_temp + shaker_setpoint_delta))
            shaker.start_run(shaker_test_RPM, shaker_test_duration)

            #Check to make sure that the shaker has heated
            time.sleep(shaker_test_duration)
            shaker.check_state()
            shaker_temp_current = float(shaker.get_responses()['temp='])
            shaker.tempOff()

            if (shaker_temp_current - shaker_start_temp) < temp_boundary:
                raise ValueError('Shaker temperature has not increased enough',
                                 shaker_start_temp, shaker_temp_current)

    def upload_protocol_run(self, completed=True, error_code=None):
        """
        Build an object containing protocol metadata and run information to be pushed to an AWS cloud watch log group

        @param completed {boolean} Used to notify the log group if the protocol was successful or not
        @param error_code {string} If completed flag is set to false, an error message should be provided here

        """
        if not self.protocol.is_simulating():
            payload = {}
            payload['user'] = self.robot_instructions['metadata']['author'][
                'name']
            payload['email'] = self.robot_instructions['metadata']['author'][
                'email']
            payload['protocol_name'] = self.robot_instructions['metadata'][
                'name']
            payload['protocol_description'] = self.robot_instructions[
                'metadata']['description']
            payload['protocol_unique_id'] = 999999999
            payload['date_created'] = self.robot_instructions['metadata'][
                'created'] // 1000  # Convert ms to s
            payload['time_started'] = int(self.start_time)
            payload['time_elapsed'] = int(self.elapsed_time)
            payload['robot_name'] = ProtocolUtils.get_OT_name()
            payload['transpiler_version'] = TRANSPILER_VERSION
            payload['comment'] = "N/A"
            payload['completed'] = completed
            payload['error_code'] = error_code

            ProtocolUtils.post_cloud_watch("protocol-logs", payload,
                                           self.cloud_watch_endpoint)


class ProtocolUtils():
    """ Static library of useful functions for the protocol"""

    def send_slack_message(message, webhook):
        """
            Send a message to the specified slack channel

            @param message {string} The message to send
            @param webhook {string} The Slack webhook for the slack channel where the message should be sent

            @return The request response if needed.
        """

        global IS_SIMULATING

        if webhook is not None and not IS_SIMULATING:

            OT_name = ProtocolUtils.get_OT_name()
            message = OT_name + " " + message

            data = {"text": message}
            data = json.dumps(data)
            req = urllib.request.Request(url=webhook,
                                         data=bytes(data.encode("utf-8")),
                                         method="POST")
            req.add_header("Content-type", "application/json")

            with urllib.request.urlopen(req) as resp:
                response = resp.read().decode()

            return response

    def post_cloud_watch(log_stream, payload, endpoint):
        """ Post to the opentrons-robot-logs log group on the Cloud Watch service

            @param log_stream {string} The name of the cloud watch log stream to post to.
            @param payload {dictionary} The payload structure is defined in Quip and built in upload_protocol_run()
            @param endpoint {string} The endpoint for the AWS cloud watch service used.
        """
        global IS_SIMULATING

        if endpoint is not None:
            header = {}
            header['log_group'] = 'opentrons-robot-logs'
            header['log_stream'] = log_stream
            header['payload'] = payload

            r = requests.post(endpoint, json=header)
            # TODO: add error handling of the response.
            print(r.json())

    def get_OT_name():
        """
            Get the name of the current Opentrons

            @return {string} The name of the Opentrons
        """
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # this can be any non 0 IP address.
        s.connect(('10.255.255.255', 1))
        # Now that it is searching for a connection we can request the IP
        robot_ip_info = s.getsockname()[0]

        # This outputs a list with the [IP Address, port_number]
        endpoint = 'http://{robot_ip}:31950/server/name'
        r = requests.get(endpoint.format(robot_ip=robot_ip_info))
        return r.json()['name']


class Shaker():
    """A class for defining QInstruments BioShake 3000T specific commands

    Contains functions to communicate with the shaker over serial as well as
    support for shaker responses
    """

    def __init__(self, serial):
        """
        Assign the serial port to the class and Leave Eco Mode for the shaker

        @param serial The opened serial port for the shaker
        """

        ## The current shaker serial port object
        self.serial = serial
        self.write('lem\r')
        ## Contains the shaker response for any commands sent
        self.response = {}

    def write(self, cmd):
        """
        Write a command to the shaker, and try to read and return the response

        @param cmd command to send to shaker

        @return the decoded response from the shaker
        """
        self.serial.reset_input_buffer()
        self.serial.reset_output_buffer()
        self.serial.write(str.encode(cmd))
        time.sleep(0.2)
        rawResponse = self.serial.readline()
        try:
            value = rawResponse.decode()
            return value[:-2]
        except:
            return None

    def start_run(self, rpm, duration):
        """
        Start a shaker run with at a set speed for a duration

        @param rpm Shaker speed
        @param duration Duration for shaking
        """
        self.write('ssts' + str(rpm) + '\r')  # Set Shake Target Speed
        self.write('sonwr' + str(duration) + '\r')  # Shake On With Runtime
        self.write('sgh\r')  # Shake Go Home
        self.check_state()

    def check_state(self):
        """
        Get shaker information such as state, Temperature, setpoint and save to response member variable
        """
        self.response['state'] = self.write('gsst\r')  # Get Shaker State
        self.response['tempState'] = self.write('gtsas\r')  # Get Temp State
        self.response['temp='] = self.write('gta\r')  # Get Temp Reading
        self.response['setpoint'] = self.write('gtt\r')  # Get setpoint

    def is_shaker_home(self):
        """
        Check if the shaker is in "home" state and return boolean

        @return True if "home" else False. Serial Error or no response also return false
        """
        self.check_state()
        if self.response:
            return self.response['state'] == str(
                3)  # 3 is hard-coded for the "home" state
        else:
            return False

    def start_temp_control(self, setpoint):
        """
        Set the shaker to the setpoint provided and start temperature tracking
        @param setpoint The value for the shaker setpoint
        """
        self.write('stt' + str(setpoint * 10) + '\r')  # Temperature setpoint
        if setpoint > 0:
            self.write('ton\r')  # Turn on Temp Control
        self.response['tempState'] = self.write('gtsas\r')  # Get Temp State

    def stop_temp_control(self):
        """
        Stop shaker temperature tracking
        """
        self.write('toff\r')  # Turn off Temp Control

    def get_responses(self):
        """
        Getter for the responses member to check that it worked
        """
        return self.response

    def stop(self):
        """
        Stop the shaker shaking
        """
        self.write('soff\r')  #Shaker OFF
