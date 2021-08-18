"""
Main Transpiler code-loop running pre- and post- protocol steps, and iterating
through all user defined steps stored in the instructions file. Initialises required classes,
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
metadata = {'apiLevel': '2.8', "transpiler_version": "210214"}
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
    how the transpiler architecture looks.
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
                ProtocolUtils.send_log_message(traceback.format_exc())

        protocol_handler.post_protocol()
        protocol_handler.upload_protocol_run()

    else:
        ProtocolUtils.send_log_message("INFO: Protocol has Failed!")
        protocol_handler.upload_protocol_run(False,
                                             "Protocol Failed to run Pre Step")
