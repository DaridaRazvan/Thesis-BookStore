from src.database import Book

class UserService:
    def __init__(self,userRepository):
        self.userRepository = userRepository
    
    def update_user_data(self,id,name,surname,email,postalCode,address):
        self.userRepository.update_user_data(id,name,surname,email,postalCode,address)

    def get_user(self,id):
        return self.userRepository.get_user(id)

    def get_user_by_email(self,email):
        return self.userRepository.get_user_by_email(email)

    def add_book_to_user_wishlist(self,bookId,userId):
        self.userRepository.add_book_to_user_wishlist(bookId,userId)

    def remove_book_from_user_wishlist(self,bookId,userId):
        self.userRepository.remove_book_from_user_wishlist(bookId,userId)

    def get_wishlisted_books(self,userId):
        return self.userRepository.get_wishlisted_books(userId)
    
    def check_if_wishlisted(self,bookId,userId):
        return self.userRepository.check_if_wishlisted(bookId,userId)