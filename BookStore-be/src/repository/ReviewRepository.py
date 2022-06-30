from src.database import Review, db
class ReviewRepository:

    def verify_review(self,id):
        review = Review.query.get(id)
        review.verified = True
        
        db.session.add(review)
        db.session.commit()

    def get_not_verified_reviews(self):
        reviews = Review.query.filter_by(verified = False)
        data = []

        for review in reviews:
            data.append({
                "id" : review.id,
                "bookId": review.bookId,
                "userId": review.userId,
                "userName": review.userName,
                "rating": review.rating,
                "description": review.description
            })
        
        return data

    def get_all_reviews(self):
        reviews = Review.query.all()
        data = []

        for review in reviews:
            data.append({
                "id" : review.id,
                "bookId": review.bookId,
                "userId": review.userId,
                "userName": review.userName,
                "rating": review.rating,
                "description": review.description
            })
        
        return data
    
    def delete_review(self,id):
        review = Review.query.get(id)
        db.session.delete(review)
        db.session.commit()

        
