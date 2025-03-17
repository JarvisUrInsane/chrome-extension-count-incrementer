from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

counter = 0  # Simple counter variable

@app.route('/')
def home():
    return render_template("index.html")  # Serve the webpage

@app.route('/get_count', methods=['GET'])
def get_count():
    global counter
    return jsonify({"count": counter})

@app.route('/increment', methods=['POST'])
def increment_count():
    global counter
    counter += 1
    return jsonify({"count": counter})

if __name__ == '__main__':
    app.run(debug=True)
