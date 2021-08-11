"""Opentrons Generator Functions

Contains functions for all of the protocol generation. The main purpose is to take an Instructions json file
and concatenate the transpiler code thus outputting a protocol that can be run on the Opentrons
"""
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys

sys.path.append(os.path.dirname(__file__))

import json

##The path of this file for use in absolute paths for transpilers
dir_path = os.path.dirname(os.path.realpath(__file__))
##The path for all transpilers
transpilers_path = dir_path + "/transpilers"

##The main transpiler loop
opentrons_transpiler = 'opentrons_transpiler.py'
##Protocol Utilities and Protocol Handler classes
opentrons_protocol_helpers = 'opentrons_protocol_helpers.py'
## Robot Handler and Tip Watchdog classes
opentrons_robot_handler = 'opentrons_robot_handler.py'
##QInstruments BioShake 3000T custom class
bioshake_3000T = 'bioshake_3000T.py'


def pretty_print(data):
    """ Used to replace a few incompatible phrases in the instructions file

    @param data The instruction raw text to be replaces
    @return output The formatted instruction text compatible with Opentrons
    """
    output = json.dumps(data, indent=4)
    output = output.replace('null', 'None')
    output = output.replace('false', 'False')
    output = output.replace('true', 'True')
    return output


def load_transpiler_file(file_name):
    """ Used to load a transpiler file so as to concatenate it later.

    @param file_name The name of the file to be grabbed from the transpiler directory (default: protocol_generator/transpilers)
    @return file_data The loaded transpiler text
    """
    with open(os.path.join(transpilers_path, file_name)) as f:
        transpiler_file = f.readlines()
    file_data = ''.join(transpiler_file)
    return file_data


def parse_lists_to_objects(robot_instructions):
    """ Used to parse the robot instructions file into Opentrons compatible objects

    It is more convenient for our front end to use a list of objects for certain parameters
    in the instructions file (i.e. Liquid Classes). However this is not what is expected by
    the Opentrons. Thus we should parse such objects, remove front-end only fields and add
    any back-end only fields.

    @param robot_instructions The robot instructions
    @return robot_instructions The parsed set of robot instructions
    """
    if isinstance(robot_instructions["sequences"], list):
        parsedSequences = {}

        for element in robot_instructions["sequences"]:
            parsedSequences[element['name']] = element["locations"]
        robot_instructions["sequences"] = parsedSequences

    if isinstance(robot_instructions["liquid_classes"], list):
        parsedClasses = {}

        for element in robot_instructions["liquid_classes"]:

            element["liquid_config_object"]["new_tip"] = "never"
            mix_before_element = element["liquid_config_object"]["mix_before"]

            if mix_before_element["repetitions"]:
                element["liquid_config_object"]["mix_before"] = (
                    mix_before_element["repetitions"],
                    mix_before_element["volume"])
            else:
                element["liquid_config_object"]["mix_before"] = None

            mix_after_element = element["liquid_config_object"]["mix_after"]

            if mix_after_element["repetitions"]:
                element["liquid_config_object"]["mix_after"] = (
                    mix_after_element["repetitions"],
                    mix_after_element["volume"])
            else:
                element["liquid_config_object"]["mix_after"] = None

            parsedClasses[element['name']] = element["liquid_config_object"]

        robot_instructions["liquid_classes"] = parsedClasses

    return robot_instructions


def generate_protocol_string(robot_instructions):
    """ Used to generate the protocol

    Simply takes the robot instructions and concatenates them with all the required transpilers.

    @param robot_instructions The robot instructions to add to the protocol
    @return protocol The concatenated protocol ready to be saved and executed on an Opentrons
    """

    robot_instructions = parse_lists_to_objects(robot_instructions)
    robot_instructions = pretty_print(robot_instructions)
    instructions = ''.join(["robot_instructions=", robot_instructions])

    transpiler_main = load_transpiler_file(opentrons_transpiler)
    protocol_helpers = load_transpiler_file(opentrons_protocol_helpers)
    robot_handler = load_transpiler_file(opentrons_robot_handler)
    external_modules = load_transpiler_file(bioshake_3000T)

    protocol = ''.join([
        instructions, '\n',
        get_env_variables(), '\n', transpiler_main, '\n', robot_handler, '\n',
        protocol_helpers, '\n', external_modules
    ])
    return protocol


def get_env_variables():
    """
        Get the environment variables for the differing endpoints and webhooks needed to access
        external services such as Slack and Cloud Watch

        @return env_variables A dictionary containing the environment variables (Keys) and their respective values.
    """
    env_variables = [
        "SLACK_LOG_WEBHOOK", "CLOUD_WATCH_EP", "SLACK_MESSAGE_WEBHOOK"
    ]
    env_variables_string = ""

    for ev in env_variables:
        val = os.getenv(ev, None)
        if val is not None:
            env_variables_string += ev + " = \"" + val + "\"\n"

    return env_variables_string
