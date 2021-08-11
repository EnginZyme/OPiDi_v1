from .. import db

class LabwareDef(db.Model):
    """ORM model for the labware definition object"""

    __tablename__ = "labware_def"

    id = db.Column(db.String, primary_key=True)
    labware_def = db.Column(db.JSON, nullable=False)