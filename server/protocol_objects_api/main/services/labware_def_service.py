""" Contains a class which performs anemic CRUD operations on the labware definition table in the
persistence layer.

The LabwareDefService class provides methods that perform the said anemic CRUD operations.

    Typical usage example:

    data = LabwareDefService.example_method(args, kwargs)
""" 

import os
import json
from typing import List, TypedDict
from pathlib import Path
from protocol_objects_api.main import db
from protocol_objects_api.main.models.labware_def import LabwareDef


class LabwareDefPayload(TypedDict):
    id: str
    labware_def: dict


class LabwareDefService:
    """
    Provides method that performs anemic CRUD operations on the labware definition table
    in the persistence layer.
    """

    def __init__(self):
        p = Path(".")
        folder_path = os.path.join(p.parent.parent.parent.resolve(), "shared_data", "labware")

        labware_map = {}

        for child in Path(folder_path).glob("*.json"):
            if child.is_file():
                labware_obj = json.loads(child.read_text())
                labware_id = labware_obj["parameters"]["loadName"]
                labware_map[labware_id] = {
                    "id": labware_id,
                    "labware_def": labware_obj
                }

        self.labware_map = labware_map

    @classmethod
    def get_labware_def(cls, id: str) -> LabwareDef:
        """Fetches a labware definition object from the persistence layer by its unique ID.

        Args:
            id (str): The said unique ID.

        Returns:
            LabwareDef: The said labware definition object.
        """
        labware_def = cls().labware_map.get(id, None)

        return labware_def

    @classmethod
    def get_labware_defs(cls) -> List[LabwareDef]:
        """Fetches the list of all labware definition objects from the persistence layer.

        Returns:
            List[LabwareDef]: The said list of all labware definition objects.
        """
        labware_defs = list(cls().labware_map.values())

        return labware_defs
