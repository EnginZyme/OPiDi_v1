import os
import unittest

from flask import current_app
from flask_testing import TestCase

from manage import app
from protocol_objects_api.main.config import basedir


class TestDevelopmentConfig(TestCase):
    def create_app(self):
        app.config.from_object('protocol_objects_api.main.config.DevelopmentConfig')
        return app

    def test_development_app_configuration(self):
        self.assertTrue(app.config['DEBUG'])
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///' + os.path.join(basedir, 'main.db')
        )


class TestTestingConfig(TestCase):
    def create_app(self):
        app.config.from_object('protocol_objects_api.main.config.TestingConfig')
        return app

    def test_testing_app_configuration(self):
        self.assertTrue(app.config['DEBUG'])
        self.assertFalse(current_app is None)
        self.assertTrue(
            app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///' + os.path.join(basedir, 'test.db')
        )


class TestProductionConfig(TestCase):
    def create_app(self):
        app.config.from_object('protocol_objects_api.main.config.ProductionConfig')
        return app

    def test_production_app_configuration(self):
        self.assertFalse(current_app is None)
        self.assertTrue(app.config['DEBUG'] is False)


if __name__ == '__main__':
    unittest.main()