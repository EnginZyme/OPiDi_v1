import os
import unittest

from flask import Flask
from flask_script import Manager
from flask_cors import CORS
from flask_migrate import Migrate, MigrateCommand
from protocol_generator_api import blueprint as generator_blueprint
from protocol_objects_api import blueprint as objects_blueprint
from protocol_objects_api.main import db
from protocol_objects_api.main.config import config_by_name


def create_app(config_name):
    """Create and configure an instance of the Flask application"""
    app = Flask(__name__)
    
    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # set the Flask app config
    app.config.from_object(config_by_name[config_name])

    # initialize database on app object
    db.init_app(app)
    
    return app

app = create_app(os.getenv('FLASK_ENV') or 'dev')
app.register_blueprint(generator_blueprint, url_prefix="/api/1/generator")
app.register_blueprint(objects_blueprint, url_prefix="/api/1/objects")
CORS(app, resources={r"*": {"origins": "*"}},  supports_credentials=True)


app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def run():
    app.run()


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('.', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)

    if result.wasSuccessful():
        return 0
        
    return 1

if __name__ == '__main__':
    manager.run()
