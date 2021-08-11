import unittest
import json
from protocol_objects_api.test.base import BaseTestCase


sample_slack_webhook_payload = {
    "id": 0,
    "slack_webhook": {
        "webhook": "string",
        "channel": "string"
    }
}


class TestSlackWebhookBlueprint(BaseTestCase):
    def test_slack_webhook_listing(self):
        """Tests the listing of all slack_webhook objects in the persistence layer.
        """
        with self.client:
            response = self.client.get("/api/1/objects/slack_webhook/")
            self.assertStatus(response, 200)

    def test_slack_webhook_creation_with_unique_slack_webhook_id(self):
        """
        Tests the creation of a slack_webhook object in the persistence layer given a unique
        slack_webhook identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/slack_webhook/", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

    def test_slack_webhook_fetch(self):
        """
        Tests the fetching of a slack_webhook object form the persistence layer given its identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/slack_webhook/", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 201)
            
            id = response.json["id"]
            response = self.client.get(f"/api/1/objects/slack_webhook/{id}")
            self.assertStatus(response, 200)

    def test_slack_webhook_update_for_existing_slack_webhook(self):
        """
        Tests the update of an existing slack_webhook object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/slack_webhook/", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.patch(f"/api/1/objects/slack_webhook/{id}", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 200)

    def test_slack_webhook_update_for_non_existent_slack_webhook(self):
        """
        Tests the update of a non-existent slack_webhook object in the persistence layer.
        """
        with self.client:
            id = 1
            response = self.client.patch(f"/api/1/objects/slack_webhook/{id}", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 404)

    def test_slack_webhook_delete(self):
        """
        Tests the removal of a slack_webhook object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/slack_webhook/", data=json.dumps(sample_slack_webhook_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.delete(f"/api/1/objects/slack_webhook/{id}")
            self.assertStatus(response, 200)

            response = self.client.get(f"/api/1/objects/slack_webhook/{id}")
            self.assertStatus(response, 200)


if __name__ == '__main__':
    unittest.main()
