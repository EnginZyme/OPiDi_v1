import unittest
import json
from protocol_objects_api.test.base import BaseTestCase


sample_protocol_payload = {
    "id": 0,
    "protocol": {
        "metadata": {
            "name": "string",
            "description": "string",
            "author": {
                "name": "string",
                "email": "string"
            },
            "is_verified": True,
            "is_shared": True,
            "created": 0,
            "version": "string"
        },
        "deck": {
            "left_pipette": {
                "pipette": {},
                "tipracks": [
                    0
                ]
            },
            "right_pipette": {
                "pipette": {},
                "tipracks": [
                    0
                ]
            },
            "slots": {
                "1": {},
                "2": {},
                "3": {},
                "4": {},
                "5": {},
                "6": {},
                "7": {},
                "8": {},
                "9": {},
                "10": {},
                "11": {},
                "12": {}
            }
        },
        "sequences": [
            {
                "name": "string",
                "id": 0,
                "locations": [
                    {
                        "slot_number": 0,
                        "slot_name": "string",
                        "id": 0,
                        "wells": [
                            "string"
                        ]
                    }
                ],
                "locationCounter": 200
            }
        ],
        "steps": [
            {
                "type": "array_transfer",
                "name": "Array Transfer (0)",
                "id": 0,
                "substeps": [],
                "parameters": {
                    "pipette": None,
                    "pipette_strategy": None,
                    "array_map_filename": None,
                    "array_map_parsed_file": None,
                    "liquid_config": None,
                    "tipsStrategy": None,
                    "offset": {
                        "source": 1,
                        "destination": 1
                    }
                }
            }
        ],
        "liquid_classes": [
            {
                "name": "string",
                "id": 0,
                "liquid_config_object": {
                    "touch_tip": True,
                    "blow_out": True,
                    "carryover": True,
                    "air_gap": 0,
                    "blowout_location": "destination well",
                    "mix_before": {
                        "repetitions": 0,
                        "volume": 0
                    },
                    "mix_after": {
                        "repetitions": 0,
                        "volume": 0
                    },
                    "aspirate_rate": 1,
                    "dispense_rate": 1,
                    "blow_out_rate": 1
                }
            }
        ],
        "stepCounter": 0,
        "sequenceCounter": 0,
        "liquidClassCounter": 0
    }
}


class TestProtocolBlueprint(BaseTestCase):
    def test_protocol_listing(self):
        """Tests the listing of all protocol objects in the persistence layer.
        """
        with self.client:
            response = self.client.get("/api/1/objects/protocol/")
            self.assertStatus(response, 200)

    def test_protocol_creation_with_unique_protocol_id(self):
        """
        Tests the creation of a protocol object in the persistence layer given a unique
        protocol identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/protocol/", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

    def test_protocol_fetch(self):
        """
        Tests the fetching of a protocol object form the persistence layer given its identifier.
        """
        with self.client:
            response = self.client.post("/api/1/objects/protocol/", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 201)
            
            id = response.json["id"]
            response = self.client.get(f"/api/1/objects/protocol/{id}")
            self.assertStatus(response, 200)

    def test_protocol_update_for_existing_protocol(self):
        """
        Tests the update of an existing protocol object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/protocol/", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.patch(f"/api/1/objects/protocol/{id}", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 200)

    def test_protocol_update_for_non_existent_protocol(self):
        """
        Tests the update of a non-existent protocol object in the persistence layer.
        """
        with self.client:
            id = 1
            response = self.client.patch(f"/api/1/objects/protocol/{id}", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 404)

    def test_protocol_delete(self):
        """
        Tests the removal of a protocol object in the persistence layer.
        """
        with self.client:
            response = self.client.post("/api/1/objects/protocol/", data=json.dumps(sample_protocol_payload),
                content_type='application/json')
            self.assertStatus(response, 201)

            id = response.json["id"]
            response = self.client.delete(f"/api/1/objects/protocol/{id}")
            self.assertStatus(response, 200)

            response = self.client.get(f"/api/1/objects/protocol/{id}")
            self.assertStatus(response, 200)


if __name__ == '__main__':
    unittest.main()
