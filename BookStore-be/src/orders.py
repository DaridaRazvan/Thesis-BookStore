from flask import Blueprint, request,jsonify
import requests
from src.database import Order,Book, User, db
from flask_cors import CORS
import smtplib, ssl

orders = Blueprint("orders",__name__,url_prefix="/orders")
CORS(orders)

smtp_server = "smtp.gmail.com"
port = 587  # For starttls
sender_email = "bookstoreverif@gmail.com"
password = "BookStore#42"

def send_email(receiver_email,message):
    # Create a secure SSL context
    context = ssl.create_default_context()

    # Try to log in to server and send email
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
    except Exception as e:
        # Print any error messages to stdout
        print(e)
    finally:
        server.quit() 

@orders.post('/add')
def add_order():
    books = request.json["orderedItems"]
    userId = int(request.json["user"])

    user = User.query.get(userId)
    email = user.email
    
    #send_email(email,"Email Test")
    for book in books:
        orderedBook = Book.query.filter_by(id = book["id"]).first()
        orderedBook.sales += book["amount"]
        db.session.commit()
        print(book)
  

    return jsonify({
        'message':'Order added successfully'
    }),201 #CREATED