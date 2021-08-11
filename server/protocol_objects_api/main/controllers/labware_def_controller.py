import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import LabwareDefDto
from ..services.labware_def_service import LabwareDefService


api = LabwareDefDto.api
_labware_def = LabwareDefDto.labware_def


@api.route("/")
class LabwareDef(Resource):
    @api.doc("list out created labware_defs")
    @api.marshal_list_with(_labware_def)
    def get(self):
        """List all created labware_defs"""
        status_code = http.client.OK
        labware_defs = LabwareDefService.get_labware_defs()

        return labware_defs, status_code


@api.route("/<id>")
@api.param("id", "the labware_def's identifier")
class SpecificLabwareDef(Resource):
    @api.doc("get a labware_def's content")
    @api.marshal_with(_labware_def)
    def get(self, id):
        """Get a labware_def_def's content given its identifier"""
        status_code = http.client.OK

        labware_def = LabwareDefService.get_labware_def(id)

        return labware_def, status_code
