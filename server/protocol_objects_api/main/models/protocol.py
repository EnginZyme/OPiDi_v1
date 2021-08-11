from .. import db

class Protocol(db.Model):
    """ORM model for the protocol object"""

    __tablename__ = "protocol"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    protocol = db.Column(db.JSON, nullable=False)