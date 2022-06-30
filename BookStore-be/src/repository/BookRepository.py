from src.database import Book, Author, Genre, db
from sqlalchemy import func,or_

NR_OF_ROWS = 5

class BookRepository:
    def get_all(self,page):
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
                "price":book.price,
                "thumbnail":book.thumbnail
                })
            
        return data
    
    def get_book_by_genre(self,genre,page):
        genre = func.lower(genre)
        #books = Book.query.filter(Book.genres.any(name=genre)).paginate(page = int(page), per_page = NR_OF_ROWS)
        books = Book.query.filter(Book.genres.any(func.lower(Genre.name).contains(genre))).paginate(page = int(page), per_page = NR_OF_ROWS)
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
                "price":book.price,
                "thumbnail":book.thumbnail
                })
            
        return data

    def add_book(self,book,authors_list,genres_list):
        db.session.add(book)

        book.authors = []
        for author_name in authors_list:
            author = Author.query.filter_by(name=author_name).first()
            if not author:
                return False
            book.authors.append(author)

        book.genres = []
        for genre_name in genres_list:
            genre = Genre.query.filter_by(name=genre_name).first()
            if not genre:
                return False
            book.genres.append(genre)

        book.users = []

        db.session.commit()
        return True
    
    def delete_book(self,id):
        book = Book.query.get(id)
        db.session.delete(book)
        db.session.commit()
    
    def get_book(self,id):
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
            "thumbnail":book.thumbnail,
            "publishedYear":book.publishedYear,
            "numberOfPages":book.numberOfPages,
            "reviews": reviews
        }

        return data

    def get_all_searched_items(self,search):
        search = func.lower(search)
        books = Book.query.filter(or_(func.lower(Book.name).contains(search) 
        ,Book.authors.any(func.lower(Author.name).contains(search))))

        data = []
        for book in books:
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
            
        return data
    
    def get_searched_items(self,search,page):
        #Book.genres.any(name=genre)
        #books = Book.query.filter(Book.name.contains(search))
        search = func.lower(search) 
        books = Book.query.filter(or_(func.lower(Book.name).contains(search) 
        ,Book.authors.any(func.lower(Author.name).contains(search)))).paginate(page = int(page), per_page = NR_OF_ROWS)

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
                    "price":book.price,
                    "thumbnail":book.thumbnail
                })
            
        return data
        
    def get_length_of_searched_items(self,search):
        #total_results = Book.query.filter(func.lower(Book.name).contains(func.lower(search))).count()
        search = func.lower(search)
        total_results = Book.query.filter(or_(func.lower(Book.name).contains(search) 
        ,Book.authors.any(func.lower(Author.name).contains(search)))).count()
        
        return total_results
    
    def get_length_of_all(self):
        total_results = Book.query.count()
        return total_results

    def get_lenght_filtered_genre(self,genre):
        genre = func.lower(genre)
        total_results = Book.query.filter(Book.genres.any(func.lower(Genre.name).contains(genre))).count()
        return total_results

    def get_top_books(self):
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
                    "sales":book.sales,
                    "thumbnail":book.thumbnail
                })
        
        return data
