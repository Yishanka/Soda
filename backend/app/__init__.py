import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    # 配置
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 10}
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # 你的 JWT 秘钥
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # 指定 JWT 从 Headers 读取
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"  # "Bearer token"

    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)  # 添加这行
    cors.init_app(app)
    jwt.init_app(app)

    # 在初始化db后导入模型
    from app import models

    # 注册蓝图
    from app.routes import register_routes
    register_routes(app)

    return app