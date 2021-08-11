""" Contains a class which performs anemic CRUD operations on the protocol table in the
persistence layer.

The ProtocolService class provides methods that perform the said anemic CRUD operations.

    Typical usage example:

    data = ProtocolService.example_method(args, kwargs)
"""

from typing import List
from protocol_objects_api.main import db
from protocol_objects_api.main.models.protocol import Protocol

import sys

if sys.version_info >= (3, 8):
    from typing import TypedDict  # pylint: disable=no-name-in-module
else:
    from typing_extensions import TypedDict


class ProtocolPayload(TypedDict):
    id: str
    protocol: dict


class ProtocolService:
    """
    Provides method that performs anemic CRUD operations on the protocol table
    in the persistence layer.
    """

    @staticmethod
    def get_protocol(id: str) -> Protocol:
        """Fetches a protocol object from the persistence layer by its unique ID.

        Args:
            id (str): The said unique ID.

        Returns:
            Protocol: The said protocol object.
        """
        protocol = Protocol.query.filter_by(id=id).first()
        db.session.close()
        return protocol

    @staticmethod
    def get_protocols() -> List[Protocol]:
        """Fetches the list of all protocol objects from the persistence layer.

        Returns:
            List[Protocol]: The said list of all protocol objects.
        """
        protocols = Protocol.query.all()
        db.session.close()
        return protocols

    @classmethod
    def create_protocol(cls, data: ProtocolPayload) -> Protocol:
        """Creates a new protocol object in the persistence layer.

        Args:
            data (ProtocolPayload): The protocol payload.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Protocol: The newly created protocol object.
        """
        try:
            protocol = Protocol(
                protocol=data["protocol"]
            )

            db.session.add(protocol)
            db.session.commit()

            id = protocol.id
            protocol = cls().get_protocol(id)

            return protocol

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @classmethod
    def update_protocol(cls, data: ProtocolPayload) -> Protocol:
        """Updates a pre-existent protocol payload object in the persistence layer.

        Args:
            data (ProtocolPayload): The protocol payload.

        Raises:
            ValueError: Protocol definition object with same ID does not exist in the persistence layer
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            Protocol: The updated protocol object.
        """
        # Raise an exception if protocol object with the same ID does not exist in the persistence layer
        if not cls().get_protocol(data["id"]):
            id = data["id"]
            raise ValueError(
                f"Protocol definition object with ID '{id}' does not exist in the persistence layer")

        try:
            protocol = Protocol.query.filter_by(id=data["id"]).first()

            if protocol:
                protocol.protocol = data["protocol"]

                db.session.add(protocol)
                db.session.commit()

                id = protocol.id
                protocol = cls().get_protocol(id)

            return protocol

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @staticmethod
    def remove_protocol(id: str) -> Protocol:
        """Deletes a pre-existent protocol defintion object from the persistence layer.

        Args:
            id (str): The unique ID of the said protocol object.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.
        """
        try:
            protocol = Protocol.query.filter_by(id=id).first()

            if protocol:
                Protocol.query.filter_by(id=id).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()
