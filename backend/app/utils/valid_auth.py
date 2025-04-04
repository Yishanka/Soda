import jwt
import os
from flask import request

SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_secret_key')
class validation():
    @staticmethod
    def check_token():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return {'is_valid': False}
        else:
            return {'is_valid': True, 'token':auth_header.split(' ')[1]} # 提取 Token
    
    @staticmethod
    def decode_token(token):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            return payload  # 返回解码后的 Token 数据
        except jwt.ExpiredSignatureError:
            return None  # Token 过期
        except jwt.InvalidTokenError:
            return None  # 无效 Token