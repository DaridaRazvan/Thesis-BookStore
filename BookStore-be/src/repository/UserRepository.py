from src.database import Book, User, db

class UserRepository:
    def get_user(self,id):
        user = User.query.get(id)
        

        userData ={
            "name":user.name,
            "surname":user.surname,
            "email":user.email,
            "address":user.adress,
            "postalCode":user.postalCode
        }

        return userData

    def get_user_by_email(self,email):
        user = User.query.filter_by(email=email).first()
        return user

    def update_user_data(self,id,name,surname,email,postalCode,address):
        user = User.query.get(id)
        user.name = name
        user.surname = surname
        user.email = email
        user.postalCode = postalCode
        user.adress = address

        db.session.add(user)
        db.session.commit()

    def add_book_to_user_wishlist(self,bookId,userId):
        book = Book.query.get(bookId)
        user = User.query.get(userId)

        user.wishlist.append(book)

        db.session.commit()
    
    def remove_book_from_user_wishlist(self,bookId,userId):
        user = User.query.get(userId)
        book = Book.query.get(bookId)

        user.wishlist.remove(book)
        
        db.session.commit()

    def check_if_wishlisted(self,bookId,userId):
        user = User.query.get(userId)
        for book in user.wishlist:
            if book.id == bookId:
                return True
        return False

    def get_wishlisted_books(self,userId):
        user = User.query.get(userId)

        bookList = []
        for book in user.wishlist:

            author_list = ""
            for author in book.authors:
                author_list += author.name + ", "
            author_list = author_list[:-2]

            bookList.append({
                "id":book.id,
                "name":book.name,
                "author":author_list,
                "thumbnail":book.thumbnail
            })
        
        return bookList
