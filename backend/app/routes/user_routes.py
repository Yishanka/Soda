from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from app.utils import validation
import jwt
from werkzeug.security import generate_password_hash
import os
import datetime

# 创建认证蓝图
user_bp = Blueprint('user_bp', __name__)

# 读取 JWT 密钥
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_secret_key')

class UserController:
    @classmethod
    def generate_token(cls, id):
        '''
        生成 JWT Token，后续操作验证用户时直接用token即可
        '''
        token = jwt.encode(
            {
                'user_id': id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24) # 过期时间
            },
            SECRET_KEY,
            algorithm='HS256'
        )
        return token
    
    @staticmethod
    @user_bp.route('/register', methods=['POST'])
    def register():
        '''
        处理用户注册
        '''
        data = request.get_json()
        if not data or not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': '缺少必要字段'}), 400

        # 检查用户名或邮箱是否已存在
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'error': '用户名或邮箱已被使用'}), 400

        # 创建用户
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash = generate_password_hash(data['password']),
            created_at = datetime.datetime.now()
        )

        # 提交数据
        db.session.add(new_user)
        db.session.commit()
        token = UserController.generate_token(new_user.id)
        return jsonify({'message': '注册成功', 'token': token}), 201

    @staticmethod
    @user_bp.route('/login', methods=['POST'])
    def login():
        '''
        处理用户登录
        '''
        data = request.get_json()
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': '缺少邮箱或密码'}), 400

        # 查找用户
        user = User.query.filter_by(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return jsonify({'error': '邮箱或密码错误'}), 401

        # 生成 JWT Token，后续操作验证用户时直接用token即可
        token = UserController.generate_token(user.id)
        return jsonify({'message': '登录成功', 'token': token}), 200

    @staticmethod
    @user_bp.route('/user', methods=['GET'])
    @staticmethod
    def get_user():
        '''
        获取当前用户信息（需要身份验证）
        '''
        valid_result = validation.check_token()
        if valid_result.get('is_valid')==False:         
            return jsonify({'error': '登录错误'}), 401
        else:
            decoded_token = validation.decode_token(valid_result.get('token'))
            try:
                user = User.query.get(decoded_token['user_id'])
                if not user:
                    return jsonify({'error': '用户不存在'}), 404
            except:
                return jsonify({'error': '还未登录，正在跳转登录页面'}), 401

            return jsonify({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }), 200