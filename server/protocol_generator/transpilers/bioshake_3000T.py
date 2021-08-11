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
        self.write('sonwr' + str(duration) + '\r')  # Shake On With Run-time
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
