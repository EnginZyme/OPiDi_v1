import unittest
from protocol_objects_api.test.base import BaseTestCase


class TestLabwareDefBlueprint(BaseTestCase):
    def test_labware_def_listing(self):
        """Tests the listing of all labware definition objects in the persistence layer.
        """
        with self.client:
            response = self.client.get("/api/1/objects/labware_def/")
            self.assertStatus(response, 200)

    def test_labware_def_fetch(self):
        """
        Tests the fetching of a labware definition object form the persistence layer given its identifier.
        """
        with self.client:
            id = "string"
            response = self.client.get(f"/api/1/objects/labware_def/{id}")
            self.assertStatus(response, 200)

if __name__ == '__main__':
    unittest.main()
