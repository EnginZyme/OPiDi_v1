import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import LabwareDto
from ..services.labware_service import LabwareService


api = LabwareDto.api
_labware = LabwareDto.labware


@api.route("/")
class Labware(Resource):
    @api.doc("list out created labwares")
    @api.marshal_list_with(_labware)
    def get(self):
        """List all created labwares"""
        status_code = http.client.OK
        labwares = LabwareService.get_labwares()

        return labwares, status_code

    @api.expect(_labware, validate=True)
    @api.doc("create a new labware")
    @api.response(http.client.CONFLICT, "Labware with given ID already exists")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.marshal_with(_labware)
    def post(self):
        """Create a new labware"""
        labware = None
        data = request.json
        status_code = http.client.CREATED

        try:
            labware = LabwareService.create_labware(data)
        except ValueError:
            status_code = http.client.CONFLICT
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return labware, status_code


@api.route("/<id>")
@api.param("id", "the labware's identifier")
class SpecificLabware(Resource):
    @api.doc("get a labware's content")
    @api.marshal_with(_labware)
    def get(self, id):
        """Get a labware's content given its identifier"""
        status_code = http.client.OK

        labware = LabwareService.get_labware(id)

        return labware, status_code

    @api.doc("update an existing labware")
    @api.expect(_labware, validate=True)
    @api.response(http.client.NOT_FOUND, "Labware with given ID does not exist")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.marshal_with(_labware)
    def patch(self, id):
        """Update an existing labware"""
        labware = None
        data = request.json
        data["id"] = id
        status_code = http.client.OK

        try:
            labware = LabwareService.update_labware(data)
        except ValueError:
            status_code = http.client.NOT_FOUND
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return labware, status_code

    @api.doc("delete an existing labware")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    def delete(self, id):
        """Delete an existing labware"""
        status_code = http.client.OK

        try:
            LabwareService.remove_labware(id)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return None, status_code
