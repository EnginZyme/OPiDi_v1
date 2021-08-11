import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import ProtocolDto
from ..services.protocol_service import ProtocolService


api = ProtocolDto.api
_protocol = ProtocolDto.protocol


@api.route("/")
class Protocol(Resource):
    @api.doc("list out created protocols")
    @api.marshal_list_with(_protocol)
    def get(self):
        """List all created protocols"""
        status_code = http.client.OK
        protocols = ProtocolService.get_protocols()

        return protocols, status_code

    @api.expect(_protocol, validate=True)
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.doc("create a new protocol")
    @api.marshal_with(_protocol)
    def post(self):
        """Create a new protocol"""
        protocol = None
        data = request.json
        status_code = http.client.CREATED

        try:
            protocol = ProtocolService.create_protocol(data)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return protocol, status_code


@api.route("/<id>")
@api.param("id", "the protocol's identifier")
class ProtocolContent(Resource):
    @api.doc("get a protocol's content")
    @api.marshal_with(_protocol)
    def get(self, id):
        """Get a protocol's content given its identifier"""
        status_code = http.client.OK

        protocol = ProtocolService.get_protocol(id)

        return protocol, status_code

    @api.doc("update an existing protocol")
    @api.expect(_protocol, validate=True)
    @api.response(http.client.NOT_FOUND, "Protocol with given ID does not exist")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    @api.marshal_with(_protocol)
    def patch(self, id):
        """Update an existing protocol"""
        protocol = None
        data = request.json
        data["id"] = id
        status_code = http.client.OK

        try:
            protocol = ProtocolService.update_protocol(data)
        except ValueError:
            status_code = http.client.NOT_FOUND
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return protocol, status_code

    @api.doc("delete an existing protocol")
    @api.response(http.client.SERVICE_UNAVAILABLE, "Database commit failed")
    def delete(self, id):
        """Delete an existing protocol"""
        status_code = http.client.OK

        try:
            ProtocolService.remove_protocol(id)
        except Exception:
            status_code = http.client.SERVICE_UNAVAILABLE

        return None, status_code
