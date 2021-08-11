#!/usr/bin/env python

import argparse
import os

test_protocol = "test_instructions"
dir_path = os.path.dirname(os.path.realpath(__file__))
OPG_path = dir_path + "/../protocol_generator"


def main(args):
    parser = argparse.ArgumentParser(
        description='Protocol Generator and Simulate')
    parser.add_argument('--test_instructions',
                        default=test_protocol,
                        metavar='-i',
                        help='Robot Instructions Json file',
                        required=False)
    args = parser.parse_args()

    os.system("python3 " + OPG_path + "/opentrons_cli.py --input " +
              args.test_instructions + ".json  --output " +
              args.test_instructions + ".py")
    os.system("opentrons_simulate " + dir_path + "/protocols/" +
              args.test_instructions + ".py -L " + dir_path + "/../../shared_data/labware/")


if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))
