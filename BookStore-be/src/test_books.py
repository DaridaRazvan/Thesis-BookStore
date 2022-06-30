import json
import sys
from flask import Flask
import pytest
from src.__init__ import create_app
from src.books import books
from src.auth import auth
from src.users import users
from src.database import db
from flask_jwt_extended import JWTManager

def start_app():
    app = Flask(__name__,instance_relative_config=True)
    app.config['DEBUG'] = True
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgre@localhost:5432/BookStore'
    app.config["JWT_SECRET_KEY"] = 'JWT_SECRET_KEY'

    db.app=app
    db.init_app(app)
    
    JWTManager(app)

    app.register_blueprint(books)
    app.register_blueprint(auth)
    app.register_blueprint(users)
    return app

def test_login_good_data():
    app = start_app()
    data = {
        'email':'user1@gmail.com',
        'password':'user'
    }

    response = app.test_client().post('/auth/login', json = data)
    assert response.status_code == 201



def test_login_bad_data():
    app = start_app()
    data = {
        'email':'invalid',
        'password':'pass'
    }

    response = app.test_client().post('/auth/login', json = data)
    assert response.status_code == 401

def test_get_top_books():
    app = start_app()
    
    response = app.test_client().get('/books/topBooks')
    assert response.status_code == 200

def test_get_books_by_genre():
    app = start_app()

    response = app.test_client().get('books/Fiction/1')
    assert response.status_code == 200

def test_seached_books():
    app = start_app()

    response = app.test_client().get('books/search/Agatha')
    assert response.status_code == 200

def test_get_book():
    app = start_app()
    response = app.test_client().get('/books/1')
    assert response.status_code == 200
    res = json.loads(response.data.decode('utf-8'))

    assert res['genre'] == 'Fiction'
    assert res['author'] == 'Marilynne Robinson'
    assert res['name'] == 'Gilead'
    assert res['numberOfPages'] == 247
    assert res['publishedYear'] == 2004
   

