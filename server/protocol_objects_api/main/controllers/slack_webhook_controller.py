import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import SlackWebhookDto
from ..services.slack_webhook_service import SlackWebhookService


api = SlackWebhookDto.api
_slack_webhook = SlackWebhookDto.slack_webhook


@api.route("/")
class SlackWebhook(Resource):
    @api.doc("list out created slack_webhooks")
    @api.marshal_list_with(_slack_webhook)
    def get(self):
        """List all created slack_webhooks"""
        status_code = http.client.OK
        slack_webhooks = SlackWebhookService.get_slack_webhooks()

        return slack_webhooks, status_code

    @api.expect(_slack_webhook, validate=True)
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.doc("create a new slack_webhook")
    @api.marshal_with(_slack_webhook)
    def post(self):
        """Create a new slack_webhook"""
        slack_webhook = None
        data = request.json
        status_code = http.client.CREATED

        try:
            slack_webhook = SlackWebhookService.create_slack_webhook(data)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return slack_webhook, status_code


@api.route("/<id>")
@api.param("id", "the slack_webhook's identifier")
@api.response(404, "slack_webhook not found")
class SlackWebhookContent(Resource):
    @api.doc("get a slack_webhook's content")
    @api.marshal_with(_slack_webhook)
    def get(self, id):
        """Get a slack_webhook's content given its identifier"""
        status_code = http.client.OK

        slack_webhook = SlackWebhookService.get_slack_webhook(id)

        return slack_webhook, status_code

    @api.doc("update an existing slack_webhook")
    @api.expect(_slack_webhook, validate=True)
    @api.response(http.client.NOT_FOUND, "Slack webhook with given ID does not exist")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.marshal_with(_slack_webhook)
    def patch(self, id):
        """Update an existing slack_webhook"""
        slack_webhook = None
        data = request.json
        data["id"] = id
        status_code = http.client.OK

        try:
            slack_webhook = SlackWebhookService.update_slack_webhook(data)
        except ValueError:
            status_code = http.client.NOT_FOUND
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return slack_webhook, status_code

    @api.doc("delete an existing slack_webhook")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    def delete(self, id):
        """Delete an existing slack_webhook"""
        status_code = http.client.OK

        try:
            SlackWebhookService.remove_slack_webhook(id)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return None, status_code
