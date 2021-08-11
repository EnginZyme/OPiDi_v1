import unittest
import json
from protocol_objects_api.test.base import BaseTestCase


sample_labware_payload = {
    "id": "string",
    "labware": {
        "labware_name": "string",
        "labware_id": "string",
        "labware_type": "string"
    }
}


class TestLabwareBlueprint(BaseTestCase):
    def test_labware_listing(self):
        """Tests the listing of all labware objects in the persistence layer.
        """
        with self.client:
            response = self.client.get("/api/1/objects/labware/")
            self.assertStatus(response, 200)

    def test_labware_creation_with_unique_labware_id(self):
        """
        Tests the creation of a labware object in the persistence layer given a unique
        labware identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/labware/", data=json.dumps(sample_labware_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

    def test_labware_creation_with_non_unique_labware_id(self):
        """
        Tests the creation of a labware object in the persistence layer given a non-unique
        labware identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/labware/", data=json.dumps(sample_labware_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            response = self.client.post("/api/1/objects/labware/", data=json.dumps(sample_labware_payload),
                                        content_type='application/json')
            self.assertStatus(response, 409)

    def test_labware_fetch(self):
        """
        Tests the fetching of a labware object form the persistence layer given its identifier.
        """
        with self.client:
            id = "string"
            response = self.client.get(f"/api/1/objects/labware/{id}")
            self.assertStatus(response, 200)

    def test_labware_update_for_existing_labware(self):
        """
        Tests the update of an existing labware object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/labware/", data=json.dumps(sample_labware_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            id = "string"
            response = self.client.patch(f"/api/1/objects/labware/{id}", data=json.dumps(sample_labware_payload),
                                         content_type='application/json')
            self.assertStatus(response, 200)

    def test_labware_update_for_non_existent_labware(self):
        """
        Tests the update of a non-existent labware object in the persistence layer.
        """
        with self.client:
            id = "stringe"
            response = self.client.patch(f"/api/1/objects/labware/{id}", data=json.dumps(sample_labware_payload),
                                         content_type='application/json')
            self.assertStatus(response, 404)

    def test_labware_delete(self):
        """
        Tests the removal of a labware object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/labware/", data=json.dumps(sample_labware_payload),
                                        content_type='application/json')
            self.assertStatus(response, 201)

            id = "string"
            response = self.client.delete(f"/api/1/objects/labware/{id}")
            self.assertStatus(response, 200)

            response = self.client.get(f"/api/1/objects/labware/{id}")
            self.assertStatus(response, 200)


if __name__ == '__main__':
    unittest.main()
