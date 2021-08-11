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
                    ProtocolUtils.send_log_message(message)
                    return False

        ProtocolUtils.send_log_message(
            "INFO: Pre-Method Successful - Running Protocol")
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
        ProtocolUtils.send_log_message(message)

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
        ProtocolUtils.send_log_message("INFO: Testing Shaker")

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
            shaker.stop_temp_control()

            if (shaker_temp_current - shaker_start_temp) < temp_boundary:
                raise ValueError('Shaker temperature has not increased enough',
                                 shaker_start_temp, shaker_temp_current)

    def upload_protocol_run(self, completed=True, error_code=None):
        """
        Build an object containing protocol metadata and run information to be pushed to an AWS cloud watch log group

        @param completed {boolean} Used to notify the log group if the protocol was successful or not
        @param error_code {string} If completed flag is set to false, an error message should be provided here

        """
        if not self.protocol.is_simulating() and "CLOUD_WATCH_EP" in globals():
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
                                           CLOUD_WATCH_EP)


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

        if not IS_SIMULATING:

            OT_name = ProtocolUtils.get_OT_name()
            message = OT_name + " " + message

            data = {"text": message}

            r = requests.post(webhook, json=data)

    def send_log_message(message):
        """
        Function containing code to handle specifically log messages. Currently just calls
        the send_slack_message() function with the SLACK_LOG_WEBHOOK. However future plans to
        integrate differing logging methods into this function.

        @param message The log message to send.
        """
        if "SLACK_LOG_WEBHOOK" in globals():
            ProtocolUtils.send_slack_message(message, SLACK_LOG_WEBHOOK)

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
            # print(r.json())

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
