from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)  # 主键，用户唯一标识
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False) 
    password_hash = db.Column(db.String(256), nullable=False)  # 存储加密后的密码
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 与活动的多对多关系：用户可以参加多个活动，一个活动也可以有多个参与者
    participated_activities = db.relationship(
        'Activity',
        secondary='participations',
        back_populates='participants'
    )

    # 与活动的一对多关系：一个用户可以创建多个活动
    created_activities = db.relationship(
        'Activity',
        back_populates='creator'
    )

    def get_user_info(self):
        '''
        Returns:
            out(dict[str, Any]): 用户信息
        '''
        return {
            'id':self.id,
            'username':self.username,
            'email':self.email,
            'password_hasj':self.password_hash
        }