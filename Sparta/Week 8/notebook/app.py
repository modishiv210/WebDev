from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

uri = "mongodb+srv://shivmodi21:shivmodi@cluster0.p8k9ttj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri)
db = client.sparta

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('note.html')

@app.route('/notes', methods=['GET', 'POST'])
def notes():
    if request.method == 'GET':
        notes = list(db.notes.find({}, {'_id': 0}))
        return jsonify(notes)
    elif request.method == 'POST':
        note = request.get_json()
        db.notes.insert_one(note)
        return '', 201

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)