from werkzeug.security import check_password_hash, generate_password_hash
from flask import Blueprint, request, jsonify
from src.database import User, db
from flask_jwt_extended import create_access_token,create_refresh_token,jwt_required,get_jwt_identity
from flask_cors import CORS

auth = Blueprint("auth",__name__,url_prefix="/auth")
CORS(auth)

from src.database import *
from src.repository.UserRepository import UserRepository
from src.service.UserService import UserService

userRepository = UserRepository()
userService = UserService(userRepository)

@auth.post('/register')
def register():
    name = request.json['name']
    surname = request.json['surname']
    password = request.json['password']
    email = request.json['email']
    adress = request.json['adress']
    postalCode = request.json['postalCode']
    isAdmin = request.json.get('isAdmin', False)

    verify_user = userService.get_user_by_email(email)
    if verify_user is not None:
        return jsonify({
            'message':'Email already used!'
        }), 200


    pwd_hash = generate_password_hash(password)

    user = User(
        name=name,
        surname=surname,
        password=pwd_hash,
        email=email,
        adress=adress,
        postalCode=postalCode,
        isAdmin=isAdmin)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message':'User added successfully'
    }),201 #CREATED

@auth.post('/login')
def login():
    email = request.json.get('email', '')
    password = request.json.get('password', '')

    user = userService.get_user_by_email(email)

    if user:
        is_pass_correct = check_password_hash(user.password,password)

        if is_pass_correct:
            refresh=create_refresh_token(identity=user.id)
            access=create_access_token(identity=user.id)

            return jsonify({
                'refresh':refresh,
                'access':access,
                'name':user.name,
                'surname':user.surname,
                'userId':user.id,
                'isAdmin':user.isAdmin
            }), 201
    
    return jsonify({
        'error':'Wrong credentials'
    }), 401


#Test
@auth.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        'name':user.name,
        'surname':user.surname,
        'password':user.password,
        'adress':user.adress,
        'postalCode':user.postalCode
    })

