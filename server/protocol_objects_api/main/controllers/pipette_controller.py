import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import PipetteDto
from ..services.pipette_service import PipetteService


api = PipetteDto.api
_pipette = PipetteDto.pipette


@api.route("/")
class Pipette(Resource):
    @api.doc("list out created pipettes")
    @api.marshal_list_with(_pipette)
    def get(self):
        """List all created pipettes"""
        status_code = http.client.OK
        pipettes = PipetteService.get_pipettes()

        return pipettes, status_code

    @api.expect(_pipette, validate=True)
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.doc("create a new pipette")
    @api.marshal_with(_pipette)
    def post(self):
        """Create a new pipette"""
        pipette = None
        data = request.json
        status_code = http.client.CREATED

        try:
            pipette = PipetteService.create_pipette(data)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return pipette, status_code


@api.route("/<id>")
@api.param("id", "the pipette's identifier")
class SpecificPipette(Resource):
    @api.doc("get a pipette's content")
    @api.marshal_with(_pipette)
    def get(self, id):
        """Get a pipette's content given its identifier"""
        status_code = http.client.OK

        pipette = PipetteService.get_pipette(id)

        return pipette, status_code

    @api.doc("update an existing pipette")
    @api.expect(_pipette, validate=True)
    @api.response(http.client.NOT_FOUND, "Labware with given ID does not exist")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.marshal_with(_pipette)
    def patch(self, id):
        """Update an existing pipette"""
        pipette = None
        data = request.json
        data["id"] = id
        status_code = http.client.OK

        try:
            pipette = PipetteService.update_pipette(data)
        except ValueError:
            status_code = http.client.NOT_FOUND
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return pipette, status_code

    @api.doc("delete an existing pipette")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    def delete(self, id):
        """Delete an existing pipette"""
        status_code = http.client.OK

        try:
            PipetteService.remove_pipette(id)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return None, status_code
