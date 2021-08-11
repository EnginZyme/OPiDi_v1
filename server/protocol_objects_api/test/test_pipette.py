import unittest
import json
from protocol_objects_api.test.base import BaseTestCase


sample_pipette_payload = {
    "id": 0,
    "pipette": {
        "name": "string",
        "id": "string",
        "is_multichannel": True
    }
}


class TestPipetteBlueprint(BaseTestCase):
    def test_pipette_listing(self):
        """Tests the listing of all pipette objects in the persistence layer.
        """
        with self.client:
            response = self.client.get("/api/1/objects/pipette/")
            self.assertStatus(response, 200)

    def test_pipette_creation_with_unique_pipette_id(self):
        """
        Tests the creation of a pipette object in the persistence layer given a unique
        pipette identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/pipette/", data=json.dumps(sample_pipette_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

    def test_pipette_fetch(self):
        """
        Tests the fetching of a pipette object form the persistence layer given its identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/pipette/", data=json.dumps(sample_pipette_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.get(f"/api/1/objects/pipette/{id}")
            self.assertStatus(response, 200)

    def test_pipette_update_for_existing_pipette(self):
        """
        Tests the update of an existing pipette object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/pipette/", data=json.dumps(sample_pipette_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.patch(f"/api/1/objects/pipette/{id}", data=json.dumps(sample_pipette_payload),
                                         content_type='application/json')
            self.assertStatus(response, 200)

    def test_pipette_update_for_non_existent_pipette(self):
        """
        Tests the update of a non-existent pipette object in the persistence layer.
        """
        with self.client:
            id = 1
            response = self.client.patch(f"/api/1/objects/pipette/{id}", data=json.dumps(sample_pipette_payload),
                                         content_type='application/json')
            self.assertStatus(response, 404)

    def test_pipette_delete(self):
        """
        Tests the removal of a pipette object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/pipette/", data=json.dumps(sample_pipette_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.delete(f"/api/1/objects/pipette/{id}")
            self.assertStatus(response, 200)

            response = self.client.get(f"/api/1/objects/pipette/{id}")
            self.assertStatus(response, 200)


if __name__ == '__main__':
    unittest.main()
