from flask import Blueprint, request,jsonify
from src.database import Genre, db
from flask_cors import CORS

genres = Blueprint("genres",__name__,url_prefix="/genres")
CORS(genres)

@genres.post('/add')
def add_genre():
    name = request.json['name']

    findGenre = Genre.query.filter_by(name=name).first()
    if not findGenre:
        genre = Genre(name=name) 
        db.session.add(genre)
        db.session.commit()

        return jsonify({
            'message':'Genre added successfully'
        }),201 #CREATED
    else:
        return jsonify({
            'message':'Genre already in database!'
        })

