from flask import Blueprint, request,jsonify
from src.database import Book, User, db
from flask_cors import CORS
from src.repository.UserRepository import UserRepository
from src.service.UserService import UserService

users = Blueprint("users",__name__,url_prefix="/users")
CORS(users)

userRepository = UserRepository()
userService = UserService(userRepository)

@users.post('/update')
def update_user_data():
    id = request.json['id']
    name = request.json['name']
    surname = request.json['surname']
    email = request.json['email']
    postalCode = request.json['postalCode']
    address = request.json['address']

    userService.update_user_data(id,name,surname,email,postalCode,address)

    return jsonify({
        'message':'User updated successfully'
    })

@users.post('/wishlist/add')
def add_book_to_wishlist():
    bookId = request.json['bookId']
    userId = request.json['userId']

    userService.add_book_to_user_wishlist(bookId,userId)

    return jsonify({
        'message':'Book added to users wishlist successfully'
    }),201 #CREATED

@users.delete('wishlist/delete/<userId>/<bookId>')
def delete_book_from_wishlist(userId,bookId):
    userService.remove_book_from_user_wishlist(bookId,userId)

    return jsonify({
        'message':'Wishlist book deleted'
    })

@users.post('/isWishlisted')
def check_if_wishlisted():
    bookId = request.json['bookId']
    userId = request.json['userId']

    if(userService.check_if_wishlisted(bookId,userId)):
        return jsonify({'message':'Book in Wishlist'})
    else:
        return jsonify({'message':'Book not in Wishlist'})

@users.get('/wishlist/<id>')
def get_wishlisted_books(id):
    data = userService.get_wishlisted_books(id)
    return jsonify(data)

@users.get('get/<id>')
def get_user(id):
    data = userService.get_user(id)
    return jsonify(data)