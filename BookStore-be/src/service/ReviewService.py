
class ReviewService:
    def __init__(self,reviewRepository):
        self.reviewRepository = reviewRepository

    def verify_review(self,id):
        self.reviewRepository.verify_review(id)

    def get_not_verified_reviews(self):
        return self.reviewRepository.get_not_verified_reviews()

    def get_all_reviews(self):
        return self.reviewRepository.get_all_reviews()
    
    def delete_review(self,id):
        self.reviewRepository.delete_review(id)