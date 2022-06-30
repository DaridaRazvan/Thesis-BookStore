from src.database import Book

class BookService:
    def __init__(self,bookRepository):
        self.bookRepository = bookRepository

    def get_all(self,page):
        return self.bookRepository.get_all(page)

    def get_all_searched_items(self,search):
        return self.bookRepository.get_all_searched_items(search)

    def get_book_by_genre(self,genre,page):
        return self.bookRepository.get_book_by_genre(genre,page)

    def add_book(self,name,description,price,sales,thumbnail,publishedYear,numberOfPages,authors,genres):
        book = Book(name=name, description=description,
                    price=price,sales = sales,
                    thumbnail = thumbnail, publishedYear = publishedYear,
                    numberOfPages = numberOfPages)

        authors_list = authors.split(",")
        genres_list = genres.split(",")

        return self.bookRepository.add_book(book,authors_list,genres_list)

    def delete_book(self,id):
        self.bookRepository.delete_book(id)

    def get_book(self,id):
        return self.bookRepository.get_book(id)

    def get_searched_items(self,search,page):
        return self.bookRepository.get_searched_items(search,page)
    
    def get_length_of_searched_items(self,search):
        total_results = self.bookRepository.get_length_of_searched_items(search)

        data = []
        data.append({
            "totalResults": total_results
        })

        return data
    
    def get_length_of_all(self):
        total_results = self.bookRepository.get_length_of_all()
        data = []
        data.append({
            "totalResults": total_results
        })

        return data
    
    def get_lenght_filtered_genre(self,genre):
        total_results = self.bookRepository.get_lenght_filtered_genre(genre)

        data = []
        data.append({
            "totalResults": total_results
        })

        return data
    
    def get_top_books(self):
        return self.bookRepository.get_top_books()





