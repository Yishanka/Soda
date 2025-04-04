from flask import Blueprint
from app.routes.activity_routes import activity_bp
from app.routes.user_routes import user_bp

def register_routes(app):
    app.register_blueprint(activity_bp, url_prefix='/api')
    app.register_blueprint(user_bp, url_prefix='/api')