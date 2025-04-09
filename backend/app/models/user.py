from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'  # 指定在数据库中的表名为 'users'

    id = db.Column(db.Integer, primary_key=True)  # 主键，用户唯一标识
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False) 
    password_hash = db.Column(db.String(256), nullable=False)  # 存储加密后的密码
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # 与活动的多对多关系：用户可以参加多个活动，一个活动也可以有多个参与者
    # 通过第三张关联表 participations 来实现
    participated_activities = db.relationship(
        'Activity',                         # 目标模型为 Activity
        secondary='participations',         # 使用中间表 participations 建立多对多关系
        back_populates='participants'       # 对应 Activity 模型中的 participants 字段，实现双向绑定
    )

    # 与活动的一对多关系：一个用户可以创建多个活动
    created_activities = db.relationship(
        'Activity',                         # 目标模型为 Activity
        back_populates='creator'            # 对应 Activity 模型中的 creator 字段，实现双向绑定
    )

    def get_user_info(self):
        return {
            'id':self.id,
            'username':self.username,
            'email':self.email,
            'password_hasj':self.password_hash
        }