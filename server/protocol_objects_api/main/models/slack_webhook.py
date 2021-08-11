from .. import db

class SlackWebhook(db.Model):
    """ORM model for the slack webhook object"""

    __tablename__ = "slack_webhook"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    slack_webhook = db.Column(db.JSON, nullable=False)