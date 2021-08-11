import unittest
import json
from protocol_generator_api.test.base import BaseTestCase


sample_protocol_payload = {
    "id": 0,
    "protocol": {
        "metadata": {
            "name": "test",
            "description": "An Initial attempt at a comprehensive OpenTrons Protocol that can be simulated or ran live to check new changes to the OpenTrons",
            "author": {"name": "Stefan Ionescu", "email": "stefan@enginzyme.com"},
            "is_verified": False,
            "is_shared": False,
            "created": 1626862367051,
        },
        "deck": {
            "left_pipette": {
                "pipette": {
                    "name": "Single Channel 300 uL - Gen 1",
                    "id": "p300_single",
                    "is_multichannel": True
                },
                "tipracks": [10]
            },
            "right_pipette": {
                "pipette": {
                    "name": "8 Channel 300 uL - Gen 2",
                    "id": "p300_multi_gen2",
                    "is_multichannel": True
                },
                "tipracks": [11]
            },
            "slots": {
                "1": {},
                "2": {
                    "name": "destination_plate_2",
                    "labware_name": "Brand 96 well-plate 0.3 mL, for visible spectroscopy",
                    "labware_type": "wellPlate",
                    "labware_id": "brand_96_vis_wellplate_0.3ml",
                    "nickname": "Destination Plate",
                    "display_name": "Destination Plate [2]",
                    "id": 2
                },
                "3": {},
                "4": {
                    "name": "enzyme_samples_4",
                    "labware_name": "24 Tube Rack 2mL",
                    "labware_type": "tubeRack",
                    "labware_id": "24_tuberack_2ml",
                    "nickname": "Enzyme Samples",
                    "display_name": "Enzyme Samples [4]",
                    "id": 4
                },
                "5": {
                    "name": "reservoir_5",
                    "labware_name": "Brand 6x slot 36 mL",
                    "labware_type": "reservoir",
                    "labware_id": "brand_6x_slot_36ml",
                    "nickname": "6 Reservoir",
                    "display_name": "6 Reservoir [5]",
                    "id": 5
                },
                "6": {
                    "name": "water_reservoir_6",
                    "labware_name": "Brand 1x slot 220 mL",
                    "labware_type": "reservoir",
                    "labware_id": "brand_1x_slot_220ml",
                    "nickname": "Water Reservoir",
                    "display_name": "Water Reservoir [6]",
                    "id": 6
                },
                "7": {},
                "8": {},
                "9": {},
                "10": {
                    "name": "tiprack_10",
                    "labware_name": "Opentrons 96 Tip Rack 0.3 mL",
                    "labware_type": "tipRack",
                    "labware_id": "opentrons_96_tiprack_300ul",
                    "nickname": "",
                    "display_name": "Opentrons 96 Tip Rack 0.3 mL [10]",
                    "id": 10
                },
                "11": {
                    "name": "tiprack_11",
                    "labware_name": "Opentrons 96 Tip Rack 0.3 mL",
                    "labware_type": "tipRack",
                    "labware_id": "opentrons_96_tiprack_300ul",
                    "nickname": "",
                    "display_name": "Opentrons 96 Tip Rack 0.3 mL [11]",
                    "id": 11
                },
                "12": {}
            }
        },
        "steps": [
            {
                "type": "simple_transfer",
                "name": "Transfer Standards into Plate",
                "id": 0,
                "substeps": [],
                "parameters": {
                    "pipette": "left_pipette",
                    "pipette_strategy": "SINGLE_CHANNEL",
                    "volumes": [100],
                    "volumes_string": "100",
                    "source": {
                        "slot_name": "enzyme_samples_4",
                        "wells": ["A1", "A2"],
                        "slot_number": 4
                    },
                    "destination": {
                        "slot_name": "destination_plate_2",
                        "wells": ["A1", "B1"],
                        "slot_number": 2
                    },
                    "liquidClass": "Default",
                    "tipsStrategy": "STANDARD",
                    "offset": {
                        "source": 1,
                        "destination": 1,
                        "source_type": "Bottom",
                        "destination_type": "Bottom"
                    },
                    "liquidClassId": 0,
                    "pipette_obj": {
                        "name": "(Left) Single Channel 300 uL - Gen 1",
                        "category": "left_pipette"
                    }
                }
            }
        ],
        "liquid_classes": [
            {
                "name": "Default",
                "id": 0,
                "liquid_config_object": {
                    "touch_tip": False,
                    "blow_out": True,
                    "carryover": True,
                    "air_gap": 0,
                    "blowout_location": "destination well",
                    "mix_before": {"repetitions": 0, "volume": 0},
                    "mix_after": {"repetitions": 0, "volume": 0},
                    "aspirate_rate": 1,
                    "dispense_rate": 1,
                    "blow_out_rate": 1
                }
            }
        ],
        "sequences": [],
        "stepCounter": 1,
        "sequenceCounter": 0,
        "liquidClassCounter": 1
    },
}


class TestGenerationBlueprint(BaseTestCase):
    def test_protocol_file_string_generation(self):
        """Tests the generation of the contents of a robot protocol file for the given protocol object."""
        with self.client:
            response = self.client.post("/api/1/generator/generate/", data=json.dumps(sample_protocol_payload),
                                        content_type='application/json')
            self.assertStatus(response, 200)


if __name__ == "__main__":
    unittest.main()
