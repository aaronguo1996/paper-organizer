from flask import Flask, request, json
from apis import read_bibtex
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/import/bibtex', methods=['GET','POST'])
def import_from_bibtex():
    bibtex_file = request.data
    str_bibtex = bibtex_file.decode('utf-8')
    contents = read_bibtex(str_bibtex)
    return json.jsonify(contents)
