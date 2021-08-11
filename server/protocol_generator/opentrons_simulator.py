"""Opentrons Simulator support functions

Simulates a given protocol using the native Opentrons Simulate library

@param input The protocol file containing the protocol to be simulated
"""
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import types
import argparse
from opentrons import simulate


def run_simulation(protocol_string, labware_map):
    """ Simulate the protocol passed in and return the output.

        @param protocol_string The protocol to be simulated
        @param labware_map Location of any custom labware that the protocol requires.
        @return simulation The output of the opentrons simulation
    """
    protocol_context = simulate.get_protocol_api('2.8',
                                                 extra_labware=labware_map)
    protocol_context.home()

    module = types.ModuleType('tools')

    exec(protocol_string, module.__dict__)

    module.run(protocol_context)

    simulation = "\n".join(protocol_context.commands())
    return simulation


def main(args):
    """ Main loop to parse the arguments and call, protocol simulate function, and print out the simulation output

    @param args system arguments from the command line

    @return N/A
    """

    parser = argparse.ArgumentParser(
        description='Opentrons Protocol Simulator for API v2 ')
    parser.add_argument('-i', '--input', help='Protocol File', required=True)

    args = parser.parse_args()

    with open(args.input, 'r') as protocol_file:
        protocol_string = protocol_file.read()

    simulation = run_simulation(protocol_string)

    print(simulation)


if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))
