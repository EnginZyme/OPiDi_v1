"""
Contains data transfer objects needed for marshalling model outputs from methods in the imported services packages
within the controllers package.
"""

from flask_restx import Namespace, fields


class PipetteDto:
    api = Namespace("pipette", description="pipette related operations")
    content_model = api.model("pipette_content_model", {
        "name": fields.String(required=True),
        "id": fields.String(required=True),
        "is_multichannel": fields.Boolean(required=True)
    })
    pipette = api.model("pipette", {
        "id": fields.Integer(description="pipette's identifier"),
        "pipette": fields.Nested(required=True, model=content_model)
    })


class SlackWebhookDto:
    api = Namespace("slack_webhook",
                    description="slack_webhook related operations")
    content_model = api.model("slack_webhook_content_model", {
        "webhook": fields.String(required=True),
        "channel": fields.String(required=True),
    })
    slack_webhook = api.model("slack_webhook", {
        "id": fields.Integer(description="slack_webhook's identifier"),
        "slack_webhook": fields.Nested(required=True, model=content_model)
    })


class LabwareDto:
    api = Namespace("labware", description="labware related operations")
    content_model = api.model("labware_content_model", {
        "labware_name": fields.String(required=True),
        "labware_id": fields.String(required=True),
        "labware_type": fields.String(required=True)
    })
    labware = api.model("labware", {
        "id": fields.String(description="labware's identifier"),
        "labware": fields.Nested(required=True, model=content_model)
    })


class LabwareDefDto:
    api = Namespace(
        "labware_def", description="labware definition related operations")
    content_model = api.model("labware_def_content_model", {
        'ordering': fields.List(required=True, cls_or_instance=fields.List(cls_or_instance=fields.String())),
        'brand': fields.Raw(required=True),
        'metadata': fields.Raw(required=True),
        'dimensions': fields.Raw(required=True),
        'schemaVersion': fields.Integer(required=True),
        'version': fields.Integer(required=True),
        'namespace': fields.String(required=True),
        'wells': fields.Raw(required=True),
        'parameters': fields.Raw(required=True),
        'groups': fields.List(required=True, cls_or_instance=fields.Raw()),
        'cornerOffsetFromSlot': fields.Raw(required=True)
    })
    labware_def = api.model("labware_def", {
        "id": fields.String(description="labware definitions's identifier"),
        "labware_def": fields.Nested(required=True, model=content_model)
    })


class ProtocolDto:
    api = Namespace("protocol", description="protocol related operations")
    author_model = api.model("author_model", {
        "name": fields.String(required=True),
        "email": fields.String(required=True)
    })
    metadata_model = api.model("metadata_model", {
        "name": fields.String(required=True),
        "description": fields.String(required=True),
        "author": fields.Nested(required=True, model=author_model),
        "is_verified": fields.Boolean(required=True),
        "is_shared": fields.Boolean(required=True),
        "created": fields.Integer(required=True)
    })
    pipette_model = api.model("pipette_model", {
        "pipette": fields.Raw(required=True),
        "tipracks": fields.List(required=True, cls_or_instance=fields.Integer())
    })
    slot_model = api.model("slot_model", {
        "1": fields.Raw(required=True),
        "2": fields.Raw(required=True),
        "3": fields.Raw(required=True),
        "4": fields.Raw(required=True),
        "5": fields.Raw(required=True),
        "6": fields.Raw(required=True),
        "7": fields.Raw(required=True),
        "8": fields.Raw(required=True),
        "9": fields.Raw(required=True),
        "10": fields.Raw(required=True),
        "11": fields.Raw(required=True),
        "12": fields.Raw(allow_null=True),
    })
    deck_model = api.model("deck_model", {
        "left_pipette": fields.Nested(required=True, model=pipette_model),
        "right_pipette": fields.Nested(required=True, model=pipette_model),
        "slots": fields.Nested(required=True, model=slot_model)
    })
    offset_model = api.model("offset_model", {
        "offset_type": fields.String(required=True),
        "value": fields.Float(required=True),
    })
    location_model = api.model("location_model", {
        "slot_number": fields.Integer(required=True),
        "slot_name": fields.String(required=True),
        "id": fields.Integer(required=True),
        "wells": fields.List(required=True, cls_or_instance=fields.String())
    })
    sequence_model = api.model("sequence_model", {
        "name": fields.String(required=True),
        "id": fields.Integer(required=True),
        "locations": fields.List(required=True, cls_or_instance=fields.Nested(model=location_model)),
        "locationCounter": fields.Integer(required=True, default=200)
    })
    mix_model = api.model("mix_model", {
        "repetitions": fields.Integer(required=True),
        "volume": fields.Float(required=True)
    })
    liquid_config_object_model = api.model("liquid_config_object_model", {
        "touch_tip": fields.Boolean(required=True),
        "blow_out": fields.Boolean(required=True),
        "carryover": fields.Boolean(required=True),
        "air_gap": fields.Float(required=True, default=0),
        "blowout_location": fields.String(required=True, default="destination well"),
        "mix_before": fields.Nested(required=True, model=mix_model),
        "mix_after": fields.Nested(required=True, model=mix_model),
        "aspirate_rate": fields.Float(default=1),
        "dispense_rate": fields.Float(default=1),
        "blow_out_rate": fields.Float(default=1)
    })
    liquid_class_model = api.model("liquid_class_model", {
        "name": fields.String(required=True),
        "id": fields.Integer(required=True),
        "liquid_config_object": fields.Nested(required=True, model=liquid_config_object_model)
    })
    content_model = api.model("protocol_content_model", {
        "metadata": fields.Nested(required=True, model=metadata_model),
        "deck": fields.Nested(required=True, model=deck_model),
        "sequences": fields.List(required=True, cls_or_instance=fields.Nested(model=sequence_model)),
        "steps": fields.List(required=True, cls_or_instance=fields.Raw(example={
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
        })),
        "liquid_classes": fields.List(required=True, cls_or_instance=fields.Nested(model=liquid_class_model)),
        "stepCounter": fields.Integer(required=True),
        "sequenceCounter": fields.Integer(required=True),
        "liquidClassCounter": fields.Integer(required=True),
    })
    protocol = api.model("protocol", {
        "id": fields.Integer(description="protocol's identifier"),
        "protocol": fields.Nested(required=True, model=content_model)
    })
