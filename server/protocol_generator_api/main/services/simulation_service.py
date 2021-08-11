import os
import json
import traceback
from pathlib import Path
from typing import Tuple
from protocol_generator.opentrons_simulator import run_simulation
from protocol_generator.opentrons_generator import generate_protocol_string


def get_labware_map() -> dict:
    """Returns a labware map object obtained from files in labware folder.

    Returns:
        dict: The said labware object
    """
    p = Path(".")
    folder_path = os.path.join(p.parent.parent.parent.resolve(), "shared_data", "labware")

    labware_map = {}

    for child in Path(folder_path).glob("*.json"):
        if child.is_file():
            labware_obj = json.loads(child.read_text())
            labware_id = labware_obj["parameters"]["loadName"]
            labware_map[labware_id] = labware_obj

    return labware_map

def get_simulation_object(instructions: dict) -> Tuple[dict, int]:
    """Returns the corresponding simulation object for an instructions file.

    Args:
        instructions (dict): The said instructions file.

    Returns:
        Tuple[dict, int]: A tuple of the said simulation object and the error status code.
    """
    labware_map = get_labware_map()

    try:
        protocol_string = generate_protocol_string(instructions)
        simulation = run_simulation(protocol_string, labware_map)
        res = {"simulation": simulation}, 0

    except:
        error_guide = "Oops, something went wrong!\nPlease copy the error traceback below, export this protocol, then send the data to a member of the automation team for resolution.\nThank you!\n \n"
        res = {"simulation": error_guide + traceback.format_exc()}, 1

    return res
