from flask import Blueprint, request,jsonify
from src.ML.KNN.ItemKNN import ItemKNN
from src.ML.KNN.UserKNN import UserKNN
from src.database import Book, Author, Book_Author, Genre, Review, db
from flask_cors import CORS
from sqlalchemy import func
import json
from src.repository.BookRepository import BookRepository
from src.service.BookService import BookService
import csv
import random

from src.ML.MatrixFact.MatrixFactorization import MatrixFactorization
from src.ML.MatrixFact.SVDTuning import SVDTuning
from src.ML.RBM.RBMStart import RBMStart
from src.ML.AutoRec.AutoRecStart import AutoRecStart

from surprise import Dataset
from surprise import Reader
import pandas as pd

books = Blueprint("books",__name__,url_prefix="/books")
CORS(books)

NR_OF_ROWS = 5

bookRepository = BookRepository()
bookService = BookService(bookRepository)

def getUserData(userId):
    userId = int(userId)

    userID = []
    bookID = []
    rating = []

    reviews = Review.query.all()

    for review in reviews:
        userID.append(review.userId)
        bookID.append(review.bookId)
        rating.append(review.rating)
    
    ratings_dict = {
        'userID': userID,
        'bookID':bookID,
        'rating':rating
    }
    df = pd.DataFrame(ratings_dict)
    reader = Reader(rating_scale=(0,100))
    data = Dataset.load_from_df(df[['userID','bookID','rating']],reader)

    return data

@books.get('/recommendation/UserKNN/<userId>')
def recommendation_system_UserKNN(userId):
    userId = int(userId)
    data = getUserData(userId)

    itemKnn = UserKNN(data)
    recommendations = itemKnn.evaluate(userId)
    metrics = itemKnn.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })

@books.get('/recommendation/ItemKNN/<userId>')
def recommendation_system_ItemKNN(userId):
    userId = int(userId)
    data = getUserData(userId)

    itemKnn = ItemKNN(data)
    recommendations = itemKnn.evaluate(userId)
    metrics = itemKnn.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })

@books.get('/recommendation/AutoRec/<userId>')    
def recommendation_system_AutoRec(userId):
    userId = int(userId)
    data = getUserData(userId)

    autoRec = AutoRecStart(data)
    recommendations = autoRec.evaluate(userId)
    metrics = autoRec.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })

@books.get('/recommendation/RBM/<userId>')
def recommendation_system_RBM(userId):
    userId = int(userId)
    data = getUserData(userId)

    rbm = RBMStart(data)
    recommendations = rbm.evaluate(userId)
    metrics = rbm.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })


@books.get('/recommendation/SVDTuning/<userId>')
def recommendation_system_SVDTuning(userId):
    userId = int(userId)
    data = getUserData(userId)

    svdT = SVDTuning(data)
    recommendations = svdT.evaluate(userId)
    metrics = svdT.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })

@books.get('/recommendation/SVD/<userId>')
def recommendation_system_SVD(userId):
    userId = int(userId)
    data = getUserData(userId)

    svd = MatrixFactorization(data)
    recommendations = svd.evaluate(userId)
    metrics = svd.accuracy()

    data = []
    for ratings in recommendations[:10]:
        book = Book.query.get(ratings[0])

        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
            "id":book.id,
            "name":book.name,
            "author": author_list,
            "genre": genre_list,
            "price":book.price,
            "thumbnail":book.thumbnail
        })
    
    return jsonify({
        "Books":data,
        "mae": metrics["MAE"],
        "rmse": metrics["RMSE"],
        "hr": metrics["HR"],
        "cHR": metrics["cHR"],
        "ARHR": metrics["ARHR"]
    })


@books.get("/generateDb")
def generate_db():
    file = open('books.csv', encoding="utf8")
    #file = open('book2.csv', encoding="utf8")
    csvreader = csv.reader(file)

    for row in csvreader:
        title = row[2]
        author_list = row[4].split(';')
        genre_name = row[5]
        thumbnail = row[6]
        description = row[7]
        if row[8] == '':
            publishedYear = 0
        else:
            publishedYear = int(row[8])
        if row[10] == '':
            numberOfPages = 0
        else:
            numberOfPages = int(row[10])


        book = Book(name=title, 
                    description=description,
                    price=random.randint(10,150),
                    sales = 0,
                    thumbnail = thumbnail,
                    publishedYear = publishedYear,
                    numberOfPages = numberOfPages)

        book.reviews = []
        book.users = []
        
        book.authors = []
        for author_name in author_list:
            author = Author.query.filter_by(name=author_name).first()
            if not author:
                author = Author(name=author_name)
                db.session.add(author)
                db.session.commit()

            book.authors.append(author)    
        
        genre = Genre.query.filter_by(name = genre_name).first()
        if not genre:
            genre = Genre(name=genre_name)
            db.session.add(genre)
            db.session.commit()
        
        book.genres = []
        book.genres.append(genre)

        db.session.commit()

    file.close()

    return "generated"

@books.get("/getAll/<page>")
def get_all(page):
    #books = Book.query.all()
    data = bookService.get_all(page)
    return jsonify(data)

    '''
    books = Book.query.paginate(page= int(page), per_page = NR_OF_ROWS)
    data = []

    #books.items instead of books bcs of paginate
    for book in books.items: 
        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
                "id":book.id,
                "name":book.name,
                "author": author_list,
                "genre": genre_list,
                "price":book.price
            })
    
    return jsonify(data)
    '''


@books.get('/<genre>/<page>')
def get_book_by_gendre(genre,page):
    print("here")
    data = bookService.get_book_by_genre(genre,page)
    return jsonify(data)

    '''
    books = Book.query.filter(Book.genres.any(name=genre)).paginate(page = int(page), per_page = NR_OF_ROWS)
    data = []

    #books.items instead of books bcs of paginate
    for book in books.items: 
        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
                "id":book.id,
                "name":book.name,
                "author": author_list,
                "genre": genre_list,
                "price":book.price
            })
    
    return jsonify(data)
    '''


@books.post('/add')
def add_book():
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    sales = request.json['sales']
    thumbnail = request.json['thumbnail']
    publishedYear = request.json['publishedYear']
    numberOfPages = request.json['numberOfPages']
    authors = request.json['authors']
    genres = request.json['genres']

    if bookService.add_book(name,description,price,sales,thumbnail,publishedYear,numberOfPages,authors,genres):
        return jsonify({
        'message':'Book added successfully'
    }),201 #CREATED
    
    return jsonify({
        'message':'Make sure the data is valid'
    })


    '''
    book = Book(name=name, 
        description=description,
        price=price)

    db.session.add(book)

    authors_list = authors.split(",")
    genres_list = genres.split(",")

    print(authors_list)
    print(genres_list)
    book.authors = []
    for author_name in authors_list:
        author = Author.query.filter_by(name=author_name).first()
        book.authors.append(author)

    book.genres = []
    for genre_name in genres_list:
        genre = Genre.query.filter_by(name=genre_name).first()
        book.genres.append(genre)

    db.session.commit()
    '''


@books.delete('/delete/<id>')
def delete_book(id):
    bookService.delete_book(id)

    return jsonify({
        'message':'Book deleted successfully'
    }),200 #OK

    '''
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()

    return jsonify({
        'message':'Book deleted successfully'
    }),200 #OK
    '''
@books.get('search/<search>')
def get_all_searched_books(search):
    data = bookService.get_all_searched_items(search)
    return jsonify(data)

@books.get('/<id>')
def get_book(id):
    data = bookService.get_book(id)
    return jsonify(data)

    '''
    book = Book.query.get(id)

    author_list = ""
    for author in book.authors:
        author_list += author.name + ", "

    genre_list = ""
    for genre in book.genres:
        genre_list += genre.name + ", "

    author_list = author_list[:-2]
    genre_list = genre_list[:-2]

    reviews = []
    for review in book.reviews:
        reviews.append({
            "id": review.id,
            "name": review.userName,
            "rating": review.rating,
            "description": review.description
        })

    data= {
        "id":book.id,
        "name":book.name,
        "description": book.description,
        "author": author_list,
        "genre": genre_list,
        "price":book.price,
        "reviews": reviews
    }
    
    return jsonify(data)
    '''

@books.get("/searchResults/<search>/<page>")
def get_searched_items(search,page):
    print(search)
    data = bookService.get_searched_items(search,page)
    return jsonify(data)

    '''
    #books = Book.query.filter(Book.name.contains(search))
    books = Book.query.filter(func.lower(Book.name)
    .contains(func.lower(search))).paginate(page = int(page), per_page = NR_OF_ROWS)

    data = []
    for book in books.items:
        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
                "id":book.id,
                "name":book.name,
                "author": author_list,
                "genre": genre_list,
                "price":book.price
            })
    
    return jsonify(data)
    '''


#number of pages for search
@books.get("/searchResults/<search>/<page>/length")
def get_length_of_searched_items(search,page):
    data = bookService.get_length_of_searched_items(search)
    return jsonify(data)
    '''
    total_results = Book.query.filter(func.lower(Book.name)
    .contains(func.lower(search))).count()

    data = []
    data.append({
        "totalResults": total_results
    })

    return jsonify(data)
    '''


#number of pages for all books
@books.get("/getAll/<page>/length")
def get_length_of_all(page):
    data = bookService.get_length_of_all()
    return jsonify(data)
    '''
    total_results = Book.query.count()

    data = []
    data.append({
        "totalResults": total_results
    })

    return jsonify(data)
    '''

@books.get("/<genre>/<page>/length")
def get_lenght_filtered_genre(genre,page):
    data = bookService.get_lenght_filtered_genre(genre)
    return jsonify(data)
    '''
    total_results = Book.query.filter(Book.genres.any(name=genre)).count()
    
    data = []
    data.append({
        "totalResults": total_results
    })

    return jsonify(data)
    '''

@books.get("/topBooks")
def get_top_books():
    data = bookService.get_top_books()
    return jsonify(data)
    '''
    top_books = Book.query.order_by(Book.sales.desc()).limit(10).all()

    data = []
    for book in top_books: 
        author_list = ""
        for author in book.authors:
            author_list += author.name + ", "

        genre_list = ""
        for genre in book.genres:
            genre_list += genre.name + ", "

        author_list = author_list[:-2]
        genre_list = genre_list[:-2]

        data.append({
                "id":book.id,
                "name":book.name,
                "author": author_list,
                "genre": genre_list,
                "price":book.price,
                "sales":book.sales
            })
    
    return jsonify(data)
    '''
    
