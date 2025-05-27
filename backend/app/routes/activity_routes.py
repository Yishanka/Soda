from datetime import datetime
from flask import Blueprint, request, jsonify
from app import db
from app.models import Activity
from app.models import Participation
from app.service import verify_token

# 创建认证蓝图
activity_bp = Blueprint('activity_bp', __name__)

def _check_activity_info():
    '''获取活动信息，并验证信息是否完整'''
    activity_info = request.get_json()
    if not activity_info or not activity_info.get('title') or not activity_info.get('time') or not activity_info.get('location') or not activity_info.get('tags') or not activity_info.get('description'):
        return None
    return activity_info

def _create_activity(activity_info, creator_id):
    '''
    创建新活动
    Parameters:
        activity_info: 活动信息，字典格式储存
        creator_id: 活动创建者的主键
    Returns:
        activity: 创建的活动对象
    '''
    activity = Activity(
        title=activity_info['title'],
        time=datetime.fromisoformat(activity_info['time']),
        location=activity_info['location'],
        tags=activity_info['tags'],
        description=activity_info['description'],
        created_at=datetime.now(),
        creator_id=creator_id
    )
    return activity

@activity_bp.route('/add_activity', methods=['POST'])
def add_activity():
    '''
    创建活动并添加到活动列表
    '''
    # 验证登录情况并获取解码后的登录信息
    decoded_token = verify_token()
    
    # 如果返回的是错误响应，说明验证失败，返回错误信息
    if isinstance(decoded_token, tuple): 
        return decoded_token
    
    creator_id = decoded_token.get('user_id')
    activity_info = _check_activity_info()
    if(not activity_info):
        return jsonify({'error': '缺少必要字段'}), 400
    
    try:
        # 创建新活动
        activity = _create_activity(activity_info, creator_id)
        # 将新活动添加到数据库
        db.session.add(activity)
        db.session.commit()

        # 将创建者与新活动加入到参与列表
        participation = Participation(user_id=creator_id, activity_id=activity.id)
        db.session.add(participation)
        db.session.commit()

        return jsonify({'message': '活动创建成功', 'activity_id': activity.id}), 201
    
    except Exception as e:
        db.session.rollback()  # 出现异常时，回滚事务
        return jsonify({'error': f'添加失败{str(e)}'}), 500

@activity_bp.route('/get_all_activities', methods=['GET'])
def get_all_activities():
    '''获取所有活动，成功则返回活动列表'''
    # 验证登录情况并获取解码后的登录信息
    decoded_token = verify_token()

    # 如果返回的是错误响应，说明验证失败
    if isinstance(decoded_token, tuple):
        return decoded_token
    
    try:
        # 获取所有活动，并转化为列表
        activities = db.session.query(Activity).order_by(Activity.created_at.asc()).all()
        activities_list = [activity.get_activity_info() for activity in activities]
        return jsonify(activities_list), 200
    except Exception as e:
        return jsonify({'error': f'活动获取失败{str(e)}'}), 500
    
@activity_bp.route('/get_creator_activities', methods=['GET'])
def get_creator_activities():
    '''获取创建者的所有活动，成功则返回活动列表'''
    # 验证登录情况并获取解码后的登录信息
    decoded_token = verify_token()

    # 如果返回的是错误响应，说明验证失败，返回错误信息
    if isinstance(decoded_token, tuple):
        return decoded_token
    
    creator_id = decoded_token.get('user_id')

    try:
        # 查询所有由该用户创建的活动
        activities = db.session.query(Activity).filter_by(creator_id=creator_id).order_by(Activity.created_at.desc()).all()
        activities_list = [activity.get_activity_info() for activity in activities]
        return jsonify(activities_list), 200

    except Exception as e:
        return jsonify({'error': f'活动获取失败{str(e)}'}), 500
    
@activity_bp.route('/get_activity_by_id/<int:activity_id>', methods=['GET'])
def get_activity_by_id(activity_id):
    '''
    获取某个活动，成功则返回活动列表
    Parameters:
        activity_id: 活动 id
    '''
    # 验证登录情况
    decoded_token = verify_token()
    if isinstance(decoded_token, tuple):  # 验证失败
        return decoded_token
    
    try:
        # 查询指定活动
        activity = Activity.query.get(activity_id)
        
        if not activity:
            return jsonify({'error': '活动不存在'}), 404
            
        # 获取活动信息并包含创建时间
        activity_info = activity.get_activity_info()
        activity_info['created_at'] = activity.created_at.isoformat()
        
        return jsonify(activity_info), 200
    except Exception as e:
        return jsonify({'error': f'活动获取失败{str(e)}'}), 500