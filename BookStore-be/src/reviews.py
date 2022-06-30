from flask import Blueprint, request, jsonify
from src.database import Review, Book, User, db
from flask_cors import CORS
from src.repository.ReviewRepository import ReviewRepository
from src.service.BookService import BookService
from src.service.ReviewService import ReviewService

reviews = Blueprint("reviews", __name__, url_prefix="/reviews")
CORS(reviews)

reviewRepository = ReviewRepository()
reviewService = ReviewService(reviewRepository)


@reviews.get('/notVerified')
def get_not_verified_reviews():
    reviews = reviewService.get_not_verified_reviews()
    return jsonify(reviews)


@reviews.get('/verify/<id>')
def verify_review(id):
    reviewService.verify_review(id)
    return jsonify({
        'message': 'Review verified'
    })


@reviews.post('/add')
def add_review():
    bookId = request.json['bookId']
    userId = request.json['userId']
    userName = request.json['userName']
    rating = request.json['rating']
    description = request.json['description']

    review = Review(bookId=bookId, userId=userId, userName=userName, rating=rating, description=description)

    db.session.add(review)
    db.session.commit()

    book = Book.query.filter_by(id=bookId).first()
    book.reviews.append(review)

    user = User.query.filter_by(id=userId).first()
    user.reviews.append(review)

    return jsonify({
        'message': 'Review added successfully'
    }), 201  # CREATED


@reviews.get('/userReviews/<id>')
def getReviewsForUser(id):
    reviews = Review.query.filter(Review.userId == id)

    data = []
    for review in reviews:
        book = Book.query.filter_by(id=review.bookId).first()
        data.append({
            "id": review.id,
            "book": book.name,
            "rating": review.rating,
            "description": review.description
        })

    return jsonify(data)


@reviews.get('/all')
def getAllReviews():
    data = reviewService.get_all_reviews()
    return jsonify(data)


@reviews.delete('/delete/<id>')
def deleteReview(id):
    reviewService.delete_review(id)

    return jsonify({
        'message': 'Review deleted successfully'
    }), 200  # OK
