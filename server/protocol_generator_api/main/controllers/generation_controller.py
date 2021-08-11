import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import GenerationDto
from ..services.generation_service import get_protocol_object


api = GenerationDto.api
response_shape = GenerationDto.response
protocol_shape = GenerationDto.protocol


@api.route("/")
class Generation(Resource):
    @api.doc("generate the contents of a robot protocol file for the given protocol object")
    @api.expect(protocol_shape)
    @api.marshal_with(response_shape)
    def post(self):
        """Generates the contents of a robot protocol file for the given protocol object"""
        status_code = http.client.OK
        instructions = request.json["protocol"]
        response = get_protocol_object(instructions)

        return response, status_code
