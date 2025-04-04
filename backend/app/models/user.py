from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    '''
    用户模型类，表示系统中的用户。
    '''
    __tablename__ = 'users'  # 数据库表名

    # 用户基本信息
    id = db.Column(db.Integer, primary_key=True)  # 主键
    username = db.Column(db.String(50), unique=True, nullable=False)  # 用户名
    email = db.Column(db.String(100), unique=True, nullable=False)  # 邮箱
    password_hash = db.Column(db.String(256), nullable=False)  # 密码哈希值
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # 用户注册时间
    
    participated_activities = db.relationship(
        'Activity', 
        secondary='participation',  # 关联 participation 表
        back_populates='participants'
    )
    created_activities = db.relationship(
        'Activity', 
        backref='creator',
        lazy=True,
        cascade='all, delete-orphan'
    )

    # 设置密码
    def set_password(self, password):
        '''
        将密码转换为哈希值并存储。
        '''
        self.password_hash = generate_password_hash(password)

    # 验证密码
    def check_password(self, password):
        '''
        验证用户输入的密码是否正确。
        '''
        return check_password_hash(self.password_hash, password)

    # 返回用户的字符串表示
    def __repr__(self):
        return f'<User {self.username}>'