from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://shivmodi21:shivmodi@cluster0.p8k9ttj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))
db = client.sparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/mars", methods=["POST"])
def mars_post():
   name_receive = request.form['name_give']
   address_receive = request.form['address_give']
   size_receive = request.form['size_give']

   doc = {
      'name': name_receive,
      'address': address_receive,
      'size': size_receive
   }

   db.mars_land.insert_one(doc)
   return jsonify({'msg': 'Order Received!'})

@app.route("/mars", methods=["GET"])
def web_mars_get():
   orders_list = list(db.mars_land.find({}, {'_id':False}))
   return jsonify({'orders': orders_list})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)