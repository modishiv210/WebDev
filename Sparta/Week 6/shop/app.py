from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://shivmodi21:shivmodi@cluster0.p8k9ttj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.sparta

app = Flask(__name__)

## HTML
@app.route('/')
def home():
    return render_template('shop.html')

# Read API
@app.route('/order', methods=['GET'])
def view_orders():
    orders = list(db.orders.find({}, {'_id': 0}))
    return jsonify({'result': 'success', 'orders': orders})

# POST API
@app.route('/order', methods=['POST'])
def save_order():
    firstname_receive = request.form['firstname_give']
    lastname_receive = request.form['lastname_give']
    count_receive = request.form['count_give']
    address_receive = request.form['address_give']
    phone_receive = request.form['phone_give']

    doc = {
        'firstname': firstname_receive,
        'lastname': lastname_receive,
        'count': count_receive,
        'address': address_receive,
        'phone': phone_receive
    }

    db.orders.insert_one(doc)

    return jsonify({'result': 'success', 'msg': 'Your order has been placed!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)