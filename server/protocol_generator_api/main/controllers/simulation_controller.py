import http.client
from flask import request
from flask_restx import Resource
from ..utils.dto import SimulationDto
from ..services.simulation_service import get_simulation_object


api = SimulationDto.api
response_shape = SimulationDto.response
protocol_shape = SimulationDto.protocol


@api.route("/")
class Simulation(Resource):
    @api.doc("generate the simulation output for the given protocol object")
    @api.expect(protocol_shape)
    @api.marshal_with(response_shape)
    def post(self):
        """Generates the simulation output for the given protocol object"""
        status_code = http.client.OK
        instructions = request.json["protocol"]
        simulation_object, error_status_code = get_simulation_object(instructions)

        if error_status_code:
            status_code = http.client.UNPROCESSABLE_ENTITY
        
        return simulation_object, status_code
