from flask import Flask
from flask_jwt_extended import JWTManager
import os

from src.auth import auth
from src.books import books
from src.authors import authors
from src.genres import genres
from src.orders import orders
from src.reviews import reviews
from src.users import users

from src.database import db


def create_app(test_config=None) :
    app = Flask(__name__,instance_relative_config=True)

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("dev"),
            SQLALCHEMY_DATABASE_URI=os.environ.get("SQLALCHEMY_DB_URI"),
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            JWT_SECRET_KEY=os.environ.get("JWT_SECRET_KEY")
            )
    else:
        app.config.from_mapping(test_config)

    db.app=app
    db.init_app(app)
    #with app.app_context():
    #    db.create_all()
    #    db.drop_all()

    JWTManager(app)

    app.register_blueprint(auth)
    app.register_blueprint(books)
    app.register_blueprint(authors)
    app.register_blueprint(genres)
    app.register_blueprint(reviews)
    app.register_blueprint(orders)
    app.register_blueprint(users)
    
    return app