from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model): 
    __tablename__ = "user"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(30),nullable=False)
    surname = db.Column(db.String(30),nullable=False)
    password = db.Column(db.Text(),nullable=False)
    email = db.Column(db.String(80),nullable=False)
    adress = db.Column(db.String(30))
    postalCode = db.Column(db.String(80))
    isAdmin = db.Column(db.Boolean)
    orders = db.relationship('Order',backref='user')
    reviews = db.relationship('Review',backref='user')
    wishlist = db.relationship('Book',secondary='wishlist',back_populates='users')

################# Book
class Review(db.Model):
    __tablename__="review"
    id = db.Column(db.Integer,primary_key=True)
    bookId = db.Column(db.Integer,db.ForeignKey('book.id'))
    userId = db.Column(db.Integer,db.ForeignKey('user.id'))
    userName = db.Column(db.String(30),nullable=False)
    rating = db.Column(db.Float,nullable=False)
    description = db.Column(db.Text(),nullable=False)
    verified = db.Column(db.Boolean,default = False, nullable = True)

class Genre(db.Model):
    __tablename__= "genre"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(200),nullable=False)
    books = db.relationship('Book',secondary='book_genre',back_populates='genres')

class Author(db.Model):
    __tablename__ = "author"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(200),nullable=False)
    books = db.relationship('Book',secondary='book_author',back_populates='authors')

class Book(db.Model):
    __tablename__ = "book"

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(500),nullable=False)
    description = db.Column(db.Text(),nullable=False)
    price = db.Column(db.Float,nullable=False)
    sales = db.Column(db.Integer,nullable=False)
    thumbnail = db.Column(db.Text(),nullable=False)
    publishedYear = db.Column(db.Integer, nullable = False)
    numberOfPages = db.Column(db.Integer, nullable = False)
    authors = db.relationship('Author',secondary='book_author',back_populates='books')
    genres = db.relationship('Genre',secondary='book_genre',back_populates='books')
    orders = db.relationship('Order',secondary='order_book',back_populates='books')
    users = db.relationship('User',secondary='wishlist',back_populates='wishlist')
    reviews = db.relationship('Review',backref='book')

class Book_Author(db.Model):
    __tablename__ = "book_author"

    id = db.Column(db.Integer, primary_key=True)
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
    authorId = db.Column(db.Integer, db.ForeignKey('author.id'))

class Book_Genre(db.Model):
    __tablename__ = "book_genre"

    id = db.Column(db.Integer, primary_key=True, index=True)
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
    genreId = db.Column(db.Integer, db.ForeignKey('genre.id'))

#################


class Order(db.Model):
    __tablename__ = "order"

    id = db.Column(db.Integer,primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey('user.id'))
    totalPrice = db.Column(db.Integer,nullable=False)
    books = db.relationship('Book',secondary='order_book',back_populates='orders')

class Order_Book(db.Model):
    __tablename__= "order_book"

    id = db.Column(db.Integer, primary_key=True, index=True)
    orderId = db.Column(db.Integer, db.ForeignKey('order.id'))
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
    numberOfBooks = db.Column(db.Integer,nullable=False)

#############

class Wishlist(db.Model):
    __tablename__="wishlist"

    id = db.Column(db.Integer, primary_key=True, index=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    bookId = db.Column(db.Integer, db.ForeignKey('book.id'))
