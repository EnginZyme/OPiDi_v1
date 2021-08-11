"""
Migrates preceeding protocols to v1 via carrying out the following steps:
> Replace liquidClassObject with liquidClassId in transfer steps
> Replace slot attribute with slot_number in [source and destination simple transfer params, and in sequence locations]
> Replace source_sequence_object and destination_sequence_object with sourceSequenceId and destinationSequenceId respectively in sequence transfer params
> Cast offset values in sequence locations, and transfer steps to Integer type
> Add Pipette object for protocols missing this attribute
> Add is_retired field for protocols missing this attribute
"""

from protocol_migration_procedure import migration_procedure


def liquidClassObject_to_liquidClassId(steps):
    if len(steps) == 0:
        return

    for step in steps:
        if "transfer" in step["type"] and "liquidClassObject" in step[
                "parameters"].keys():
            step["parameters"]["liquidClassId"] = step["parameters"][
                "liquidClassObject"]["id"]
            del step["parameters"]["liquidClassObject"]

        liquidClassObject_to_liquidClassId(step["substeps"])


def slot_to_slot_number_steps(steps):
    if len(steps) == 0:
        return

    for step in steps:
        if step["type"] == "simple_transfer" and "slot" in step["parameters"][
                "source"].keys():
            step["parameters"]["source"]["slot_number"] = step["parameters"][
                "source"]["slot"].get("id", -1)
            del step["parameters"]["source"]["slot"]

        if step["type"] == "simple_transfer" and "slot" in step["parameters"][
                "destination"].keys():
            step["parameters"]["destination"]["slot_number"] = step[
                "parameters"]["destination"]["slot"].get("id", -1)
            del step["parameters"]["destination"]["slot"]

        slot_to_slot_number_steps(step["substeps"])


def slot_to_slot_number_sequence_locations(sequences):
    for sequence in sequences:
        for location in sequence["locations"]:
            if "slot" in location.keys():
                location["slot_number"] = location["slot"].get("id", -1)
                del location["slot"]


def sequence_object_to_sequenceId(steps):
    if len(steps) == 0:
        return

    for step in steps:
        if step["type"] == "sequence_transfer" and "source_sequence_object" in step[
                "parameters"]:
            step["parameters"]["sourceSequenceId"] = step["parameters"][
                "source_sequence_object"]["id"]
            del step["parameters"]["source_sequence_object"]

        if step["type"] == "sequence_transfer" and "destination_sequence_object" in step[
                "parameters"]:
            step["parameters"]["destinationSequenceId"] = step["parameters"][
                "destination_sequence_object"]["id"]
            del step["parameters"]["destination_sequence_object"]

        sequence_object_to_sequenceId(step["substeps"])


def add_pipette_obj_steps(steps, deck):
    if len(steps) == 0:
        return

    for step in steps:
        if "transfer" in step["type"] and "pipette_obj" not in step[
                "parameters"]:
            if step["parameters"]["pipette"] in [
                    "left_pipette", "right_pipette"
            ]:
                step["parameters"]["pipette_obj"] = {
                    "name":
                        f'{"(Left)" if step["parameters"]["pipette"] == "left_pipette" else "(Right)"} {deck[step["parameters"]["pipette"]]["pipette"]["name"]}',
                    "category":
                        step["parameters"]["pipette"]
                }
            else:
                step["parameters"]["pipette_obj"] = {}

        add_pipette_obj_steps(step["substeps"], deck)


def offset_values_to_Integer_Type_steps(steps):
    if len(steps) == 0:
        return

    for step in steps:
        if "transfer" in step["type"]:
            step["parameters"]["offset"]["source"] = float(
                step["parameters"]["offset"]["source"])
            step["parameters"]["offset"]["destination"] = float(
                step["parameters"]["offset"]["destination"])

        offset_values_to_Integer_Type_steps(step["substeps"])


def add_is_retired(obj):
    if "is_retired" not in obj["protocol"]["metadata"].keys():
        obj["protocol"]["metadata"]["is_retired"] = False
    elif obj["protocol"]["metadata"]["is_retired"] == None:
        obj["protocol"]["metadata"]["is_retired"] = False


def migrate_protocol_object(obj):
    liquidClassObject_to_liquidClassId(obj["protocol"]["steps"])
    slot_to_slot_number_steps(obj["protocol"]["steps"])
    slot_to_slot_number_sequence_locations(obj["protocol"]["sequences"])
    sequence_object_to_sequenceId(obj["protocol"]["steps"])
    offset_values_to_Integer_Type_steps(obj["protocol"]["steps"])
    add_pipette_obj_steps(obj["protocol"]["steps"], obj["protocol"]["deck"])
    add_is_retired(obj)


if __name__ == "__main__":
    migration_procedure(migrate_protocol_object)
