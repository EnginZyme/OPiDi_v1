from .. import db

class Pipette(db.Model):
    """ORM model for the pipette object"""

    __tablename__ = "pipette"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    pipette = db.Column(db.JSON, nullable=False)