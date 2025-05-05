import os
import jwt
import datetime
from flask import jsonify, request

def generate_token(id):
    '''
    根据用户id 生成 token
    Parameters:
        id: 用户id
    Returns:
        token: 生成的 token
    '''
    token = jwt.encode(
        {
            'user_id': id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=12) # 过期时间
        },
        key=os.getenv('JWT_SECRET_KEY'),
        algorithm='HS256'
    )
    return token
    
def verify_token():
    '''
    验证前端请求是否包含用户的登录信息。
    Returns:
        没有 token 返回错误 'NOTOKEN'，token 错误返回错误 'INVALIDTOKEN'
        token 正常返回解码后的 token
    '''
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'NOTOKEN'}), 401

    # 验证登录信息是否有效
    try:
        # 解码 JWT Token
        decoded_token = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])
        return decoded_token
    except Exception as e:
        return jsonify({'error': 'INVALIDTOKEN'}), 500