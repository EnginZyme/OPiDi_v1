""" Contains a class which performs anemic CRUD operations on the pipette table in the
persistence layer.

The PipetteService class provides methods that perform the said anemic CRUD operations.

    Typical usage example:

    data = PipetteService.example_method(args, kwargs)
"""

from typing import List, TypedDict
from protocol_objects_api.main import db
from protocol_objects_api.main.models.pipette import Pipette


class PipettePayload(TypedDict):
    id: str
    pipette: dict


class PipetteService:
    """
    Provides method that performs anemic CRUD operations on the pipette table
    in the persistence layer.
    """

    @staticmethod
    def get_pipette(id: str) -> Pipette:
        """Fetches a pipette object from the persistence layer by its unique ID.

        Args:
            id (str): The said unique ID.

        Returns:
            Pipette: The said pipette object.
        """
        pipette = Pipette.query.filter_by(id=id).first()
        db.session.close()
        return pipette

    @staticmethod
    def get_pipettes() -> List[Pipette]:
        """Fetches the list of all pipette objects from the persistence layer.

        Returns:
            List[Pipette]: The said list of all pipette objects.
        """
        pipettes = Pipette.query.all()
        db.session.close()
        return pipettes

    @classmethod
    def create_pipette(cls, data: PipettePayload) -> Pipette:
        """Creates a new pipette object in the persistence layer.

        Args:
            data (PipettePayload): The pipette payload.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Pipette: The newly created pipette object.
        """
        try:
            pipette = Pipette(
                pipette=data["pipette"]
            )

            db.session.add(pipette)
            db.session.commit()

            id = pipette.id
            pipette = cls().get_pipette(id)

            return pipette

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @classmethod
    def update_pipette(cls, data: PipettePayload) -> Pipette:
        """Updates a pre-existent pipette payload object in the persistence layer.

        Args:
            data (PipettePayload): The pipette payload.

        Raises:
            ValueError: Pipette definition object with same ID does not exist in the persistence layer
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Pipette: The updated pipette object.
        """
        # Raise an exception if pipette object with the same ID does not exist in the persistence layer
        if not cls().get_pipette(data["id"]):
            id = data["id"]
            raise ValueError(
                f"Pipette definition object with ID '{id}' does not exist in the persistence layer")

        try:
            pipette = Pipette.query.filter_by(id=data["id"]).first()

            if pipette:
                pipette.pipette = data["pipette"]
                
                db.session.add(pipette)
                db.session.commit()

                id = pipette.id
                pipette = cls().get_pipette(id)

            return pipette

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @staticmethod
    def remove_pipette(id: str) -> Pipette:
        """Deletes a pre-existent pipette defintion object from the persistence layer.

        Args:
            id (str): The unique ID of the said pipette object.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.
        """
        try:
            pipette = Pipette.query.filter_by(id=id).first()

            if pipette:
                Pipette.query.filter_by(id=id).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()
