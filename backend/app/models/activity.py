from datetime import datetime
from app import db

class Activity(db.Model):
    __tablename__ = 'activities' 

    id = db.Column(db.Integer, primary_key=True)  # 主键，活动唯一标识
    title = db.Column(db.String(255), nullable=False) 
    time = db.Column(db.DateTime, nullable=False)  
    location = db.Column(db.String(255), nullable=False)  
    tags = db.Column(db.Text)
    description = db.Column(db.Text) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # 外键，指向创建该活动的用户 ID

    # 与用户的一对多关系：每个活动只能有一个创建者（creator）
    creator = db.relationship(
        'User',
        back_populates='created_activities'
    )

    participants = db.relationship(
        'User',
        secondary='participations',
        back_populates='participated_activities'  # 对应 User 模型中的 participated_activities 字段
    )

    def get_activity_info(self):
        '''
        Returns:
            out(dict[str, Any]): 用户信息
        '''
        return {
            'id': self.id,
            'title': self.title,
            'time': self.time,
            'location': self.location,
            'tags': str(self.tags)[1:-1].split(','),
            'description': self.description,
            'creator_id': self.creator.id,
            'creator_name': self.creator.username 
        }