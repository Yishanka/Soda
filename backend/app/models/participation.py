from app import db

class Participation(db.Model):
    __tablename__ = 'participation'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), primary_key=True)

    def __repr__(self):
        return f'<Participation user_id={self.user_id} activity_id={self.activity_id} creator={self.is_creator}>'