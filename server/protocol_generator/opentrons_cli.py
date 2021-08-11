"""Opentrons Command Line Interface

A simple set of command line arguments to interface with the opentrons generator

@param input The name of the Robot Instructions Json file to use for the protocol.
Default found at instructions_path = dir_path + "/../test/instructions"

@param output the name of the protocol file generated.
Default saved at output_path = dir_path + "/../test/protocols"
"""
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os, sys

sys.path.append(os.path.dirname(__file__))

import json
import argparse

##The path of this file for use in absolute paths for transpilers
dir_path = os.path.dirname(os.path.realpath(__file__))
## Where to save created protocols
output_path = dir_path + "/../test/protocols"
## Where to find instructions files for generator input
instructions_path = dir_path + "/../test/instructions"

from opentrons_generator import generate_protocol_string


def main(args):
    """ Main loop to parse the arguments and call, protocol generator function, and save the resulting protocol

    @param args system arguments from the command line

    @return N/A
    """
    parser = argparse.ArgumentParser(
        description='Opentrons Protocol Generator for API v2 ')

    parser.add_argument('--input',
                        metavar='-i',
                        help='Robot Instructions Json file',
                        required=True)
    parser.add_argument('--output',
                        metavar='-o',
                        help='Output protocol file',
                        required=True)

    args = parser.parse_args()

    output_name = args.output

    with open(os.path.join(instructions_path, args.input)) as json_file:
        robot_instructions = json.load(json_file)

    protocol = generate_protocol_string(robot_instructions)

    with open(os.path.join(output_path, output_name), 'w') as f:
        f.write(protocol)


if __name__ == '__main__':
    import sys

    sys.exit(main(sys.argv))
