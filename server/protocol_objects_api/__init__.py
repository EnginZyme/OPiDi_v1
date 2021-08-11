from flask_restx import Api
from flask import Blueprint

from .main.controllers.protocol_controller import api as protocol_ns
from .main.controllers.labware_controller import api as labware_ns
from .main.controllers.labware_def_controller import api as labware_def_ns
from .main.controllers.pipette_controller import api as pipette_ns
from .main.controllers.slack_webhook_controller import api as slack_webhook_ns

blueprint = Blueprint('objects_api', __name__)

api = Api(blueprint,
          title='PROTOCOL OBJECTS API',
          version='1.0',
          description='Presents a CRUD interface on top of the persistence layer storing objects from the Protocol Designer SPA project.'
          )

api.add_namespace(protocol_ns, path="/protocol")
api.add_namespace(labware_ns, path="/labware")
api.add_namespace(labware_def_ns, path="/labware_def")
api.add_namespace(pipette_ns, path="/pipette")
api.add_namespace(slack_webhook_ns, path="/slack_webhook")