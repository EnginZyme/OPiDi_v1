from .. import db

class Labware(db.Model):
    """ORM model for the labware object"""

    __tablename__ = "labware"

    id = db.Column(db.String, primary_key=True)
    labware = db.Column(db.JSON, nullable=False)