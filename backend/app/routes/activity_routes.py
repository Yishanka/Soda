# 活动API
from flask import Blueprint, request, jsonify
import datetime
from app import db
from app.models import Activity
from app.models import Participation
from app.utils import validation

activity_bp = Blueprint('activity_bp', __name__)

class ActivityController:
    @staticmethod
    @activity_bp.route('/activities', methods=['POST'])
    def create_activity():
        '''
        由当前登录用户创建一个活动
        '''
        valid_result = validation.check_token()
        if valid_result.get('is_valid') == False:
            return jsonify({'error': '请求错误'}), 401
        else: 
            try:
                decoded_token = validation.decode_token(valid_result.get('token'))
                creator_id = decoded_token.get('user_id')
                data = request.get_json()
            except:
                return jsonify({'error': '登录已过期或登录无效'}), 500
            try:
                # 添加活动到 Activity
                activity_time = datetime.datetime.fromisoformat(data['time'])
                activity = Activity(
                    title=data['title'],
                    time=activity_time,
                    location=data['location'],
                    tags=data['tags'],
                    description=data['description'],
                    creator_id = creator_id,
                    created_at = datetime.datetime.now()
                )
                db.session.add(activity)
                db.session.commit()

                # 添加创建者到 Participation
                participation = Participation(user_id=creator_id, activity_id=activity.id)
                db.session.add(participation)
                db.session.commit()

                return jsonify({'message': '活动发布成功', 'activity_id': activity.id}), 201
            except Exception as e:
                return jsonify({'error': '活动发布失败'}), 500

    @staticmethod
    @activity_bp.route('/activities', methods=['GET'])
    def get_activities():
        '''
        获取所有活动
        '''
        valid_result = validation.check_token()
        if valid_result.get('is_valid')==False:         
            return jsonify({'error': '请求错误'}), 401
        else: 
            try:
                activities = Activity.get_all()
                activities_list = [
                    {
                        'id': activity.id,
                        'title': activity.title,
                        'time': activity.time,
                        'location': activity.location,
                        'tags': str(activity.tags).split(','),
                        'description': activity.description,
                        'creator_id': activity.creator.id,
                        'creator_name': activity.creator.username  # 添加创建者名称
                    }
                    for activity in activities
                ]
                return jsonify(activities_list), 200
            except Exception as e:
                return jsonify({'error': str(e)}), 500