import json, argparse
from protocol_migration_procedure import migration_procedure
""" A tool to loop within the json instructions file and update steps following predefined patterns
"""


def addDefaultOffset(step):

    if step['type'] == "simple_transfer" or step['type'] == "sequence_transfer":
        if "offset" in step['parameters'] and "source_type" not in step[
                'parameters']["offset"].keys():
            step['parameters']["offset"]["source_type"] = "Bottom"
            step['parameters']["offset"]["destination_type"] = "Bottom"

    return step


def updateSteps(steps, updateMethod):
    """ updateMethod is a pointer to the function"""

    for i in range(len(steps)):

        step = steps[i]

        step = updateMethod(step)

        if step['type'] == "loop":
            step['substeps'] = updateSteps(step['substeps'], updateMethod)

        steps[i] = step

    return steps


def migrate_protocol_object(protocol_object):
    protocol_object["protocol"]["steps"] = updateSteps(
        protocol_object["protocol"]["steps"], addDefaultOffset)


def main(args):

    parser = argparse.ArgumentParser(
        description='Opentrons Protocol Simulator for API v2 ')
    parser.add_argument('-i',
                        '--input',
                        help='json instructions file',
                        required=True)

    args = parser.parse_args()

    with open(args.input, 'r') as instructionsFile:
        instructions = json.load(instructionsFile)

    with open(args.input + '.old', 'w') as outfile:  # File backup
        json.dump(
            instructions,
            outfile,
            indent=4,
        )

    instructions['steps'] = updateSteps(instructions['steps'], addDefaultOffset)

    with open(args.input + '.new', 'w') as outfile:  # File backup
        json.dump(instructions, outfile, indent=4)

    return 0


if __name__ == '__main__':
    # import sys
    # sys.exit(main(sys.argv))
    migration_procedure(migrate_protocol_object)
