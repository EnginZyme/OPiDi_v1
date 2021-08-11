""" Contains a class which performs anemic CRUD operations on the slack_webhook table in the
persistence layer.

The SlackWebhookService class provides methods that perform the said anemic CRUD operations.

    Typical usage example:

    data = SlackWebhookService.example_method(args, kwargs)
"""

from typing import List
from protocol_objects_api.main import db
from protocol_objects_api.main.models.slack_webhook import SlackWebhook

import sys

if sys.version_info >= (3, 8):
    from typing import TypedDict  # pylint: disable=no-name-in-module
else:
    from typing_extensions import TypedDict


class SlackWebhookPayload(TypedDict):
    id: str
    slack_webhook: dict


class SlackWebhookService:
    """
    Provides method that performs anemic CRUD operations on the slack_webhook table
    in the persistence layer.
    """

    @staticmethod
    def get_slack_webhook(id: str) -> SlackWebhook:
        """Fetches a slack_webhook object from the persistence layer by its unique ID.

        Args:
            id (str): The said unique ID.

        Returns:
            SlackWebhook: The said slack_webhook object.
        """
        slack_webhook = SlackWebhook.query.filter_by(id=id).first()
        db.session.close()
        return slack_webhook

    @staticmethod
    def get_slack_webhooks() -> List[SlackWebhook]:
        """Fetches the list of all slack_webhook objects from the persistence layer.

        Returns:
            List[SlackWebhook]: The said list of all slack_webhook objects.
        """
        slack_webhooks = SlackWebhook.query.all()
        db.session.close()
        return slack_webhooks

    @classmethod
    def create_slack_webhook(cls, data: SlackWebhookPayload) -> SlackWebhook:
        """Creates a new slack_webhook object in the persistence layer.

        Args:
            data (SlackWebhookPayload): The slack_webhook payload.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            SlackWebhook: The newly created slack_webhook object.
        """
        try:
            slack_webhook = SlackWebhook(
                slack_webhook=data["slack_webhook"]
            )

            db.session.add(slack_webhook)
            db.session.commit()

            id = slack_webhook.id
            slack_webhook = cls().get_slack_webhook(id)

            return slack_webhook

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @classmethod
    def update_slack_webhook(cls, data: SlackWebhookPayload) -> SlackWebhook:
        """Updates a pre-existent slack_webhook payload object in the persistence layer.

        Args:
            data (SlackWebhookPayload): The slack_webhook payload.

        Raises:
            ValueError: SlackWebhook definition object with same ID does not exist in the persistence layer
            e: A catch-all for all issues with commits to the persistence layer.

        Returns:
            SlackWebhook: The updated slack_webhook object.
        """
        # Raise an exception if slack_webhook object with the same ID does not exist in the persistence layer
        if not cls().get_slack_webhook(data["id"]):
            id = data["id"]
            raise ValueError(
                f"SlackWebhook definition object with ID '{id}' does not exist in the persistence layer")

        try:
            slack_webhook = SlackWebhook.query.filter_by(id=data["id"]).first()

            if slack_webhook:
                slack_webhook.slack_webhook = data["slack_webhook"]

                db.session.add(slack_webhook)
                db.session.commit()

                id = slack_webhook.id
                slack_webhook = cls().get_slack_webhook(id)

            return slack_webhook

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()

    @staticmethod
    def remove_slack_webhook(id: str) -> SlackWebhook:
        """Deletes a pre-existent slack_webhook defintion object from the persistence layer.

        Args:
            id (str): The unique ID of the said slack_webhook object.

        Raises:
            e: A catch-all for all issues with commits to the persistence layer.
        """
        try:
            slack_webhook = SlackWebhook.query.filter_by(id=id).first()

            if slack_webhook:
                SlackWebhook.query.filter_by(id=id).delete()
                db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise e

        finally:
            db.session.close()
