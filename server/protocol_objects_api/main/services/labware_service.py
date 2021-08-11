""" Contains a class which performs anemic CRUD operations on the labware table in the
persistence layer.

The LabwareService class provides methods that perform the said anemic CRUD operations.

    Typical usage example:

    data = LabwareService.example_method(args, kwargs)
"""

from typing import List, TypedDict
from protocol_objects_api.main import db
from protocol_objects_api.main.models.labware import Labware


class LabwarePayload(TypedDict):
    id: str
    labware: dict


class LabwareService:
    """
    Provides method that performs anemic CRUD operations on the labware table
    in the persistence layer.
    """

    @staticmethod
    def get_labware(id: str) -> Labware:
        """Fetches a labware object from the persistence layer by its unique ID.

        Args:
            id (str): The said unique ID.

        Returns:
            Labware: The said labware object.
        """
        labware = Labware.query.filter_by(id=id).first()
        db.session.close()
        return labware

    @staticmethod
    def get_labwares() -> List[Labware]:
        """Fetches the list of all labware objects from the persistence layer.

        Returns:
            List[Labware]: The said list of all labware objects.
        """
        labwares = Labware.query.all()
        db.session.close()
        return labwares

    @classmethod
    def create_labware(cls, data: LabwarePayload) -> Labware:
        """Creates a new labware object in the persistence layer.

        Args:
            data (LabwarePayload): The labware payload.

        Raises:
            ValueError: Labware definition object with same ID already exists in the persistence layer
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Labware: The newly created labware object.
        """
        # Raise an exception if labware object with the same ID already exists in the persistence layer
        if cls().get_labware(data["id"]):
            id = data["id"]
            raise ValueError(
                f"Labware definition object with ID '{id}' already exists in the persistence layer")

        try:
            labware = Labware(
                id=data["id"],
                labware=data["labware"]
            )

            db.session.add(labware)
            db.session.commit()

            labware = cls().get_labware(data["id"])

            return labware

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @classmethod
    def update_labware(cls, data: LabwarePayload) -> Labware:
        """Updates a pre-existent labware payload object in the persistence layer.

        Args:
            data (LabwarePayload): The labware payload.

        Raises:
            ValueError: Labware definition object with same ID does not exist in the persistence layer
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Labware: The updated labware object.
        """
        # Raise an exception if labware object with the same ID does not exist in the persistence layer
        if not cls().get_labware(data["id"]):
            id = data["id"]
            raise ValueError(
                f"Labware definition object with ID '{id}' does not exist in the persistence layer")

        try:
            labware = cls().get_labware(data["id"])

            if labware:
                labware.labware = data["labware"]
                
                db.session.add(labware)
                db.session.commit()

                labware = cls().get_labware(data["id"])

            return labware

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @staticmethod
    def remove_labware(id: str) -> Labware:
        """Deletes a pre-existent labware defintion object from the persistence layer.

        Args:
            id (str): The unique ID of the said labware object.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.
        """
        try:
            labware = Labware.query.filter_by(id=id).first()

            if labware:
                Labware.query.filter_by(id=id).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()
