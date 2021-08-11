import os
from flask_restx import Api
from flask import Blueprint
from .main.controllers.simulation_controller import api as simulation_ns
from .main.controllers.generation_controller import api as generation_ns

basedir = os.path.abspath(os.path.dirname(__file__))

blueprint = Blueprint('generator_api', __name__)

api = Api(blueprint,
          title='Protocol Generator API',
          version='1.0',
          description='Provides endpoints that enable the simulation of protocols and generation of the corresponding robot file'
          )

api.add_namespace(simulation_ns, path="/simulate")
api.add_namespace(generation_ns, path="/generate")