from flask import Blueprint, request,jsonify
from src.database import Author, db
from flask_cors import CORS

authors = Blueprint("authors",__name__,url_prefix="/authors")
CORS(authors)

@authors.get('/name/<name>')
def get_author_by_name(name):
    author = Author.query.filter_by(name=name).first()
    if not author:
        print("didn't find")
    else:
        print("found")

    return("check console")

@authors.post('/add')
def add_author():
    name = request.json['name']

    author = Author(name=name)

    db.session.add(author)
    db.session.commit()

    return jsonify({
        'message':'Author added successfully'
    }),201 #CREATED
