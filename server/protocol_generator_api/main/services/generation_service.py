from protocol_generator.opentrons_generator import generate_protocol_string


def get_protocol_object(instructions: dict) -> dict:
    """Generates the corresponding protocol object for the instructions object.

    Args:
        instructions (dict): The said instructions object.

    Returns:
        dict: The said protocol object.
    """
    protocol_object = {"protocol": generate_protocol_string(instructions)}

    return protocol_object