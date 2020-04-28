from flask import Flask, request, json
from apis import read_bibtex, get_db_papers
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/import/bibtex', methods=['GET','POST'])
def import_from_bibtex():
    bibtex_file = request.data
    str_bibtex = bibtex_file.decode('utf-8')
    contents = read_bibtex(str_bibtex)
    print(contents[0])
    return json.jsonify(contents)

@app.route('/all', methods=['GET','POST'])
def all_papers():
    results = get_db_papers()
    for r in results:
        r.pop('_id', None)
    return json.jsonify(results)
