from flask import Flask
from app.routes import activity_routes
from app.routes import auth_routes

# 在 app 中加载蓝图
def register_routes(app: Flask):
    app.register_blueprint(activity_routes.activity_bp, url_prefix='/api/activity')
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/api/auth')