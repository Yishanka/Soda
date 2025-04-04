from datetime import datetime
from app import db

class Activity(db.Model):
    '''
    活动模型类，表示用户发布的活动。
    '''
    __tablename__ = 'activities'  # 数据库表名

    # 活动基本信息
    id = db.Column(db.Integer, primary_key=True)  # 主键
    title = db.Column(db.String(255), nullable=False)  # 活动标题
    time = db.Column(db.DateTime, nullable=False)  # 活动时间
    location = db.Column(db.String(255), nullable=False)  # 活动地点
    tags = db.Column(db.Text)  # 标签以逗号分隔
    description = db.Column(db.Text)  # 活动描述
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # 活动创建时间

    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    participants = db.relationship(
        'User',
        secondary='participation',
        back_populates='participated_activities'
    )

    @classmethod
    def get_all(cls):
        '''获取所有活动'''
        return cls.query.order_by(cls.time.asc()).all()  # 按时间升序排列
    
    @classmethod
    def get_by_id(cls, activity_id):
        '''根据ID获取单个活动'''
        return cls.query.get(activity_id)
    
    def __repr__(self):
        return f'<Activity {self.title}>'
    