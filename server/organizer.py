from flask import Flask, request, json
from apis import read_bibtex, write_bibtex, get_db_papers, update_db_paper, delete_db_paper, search_paper, add_db_papers
from scholar import search_by_title
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bibtex/import', methods=['GET','POST'])
def import_from_bibtex():
    bibtex_file = request.data
    str_bibtex = bibtex_file.decode('utf-8')
    contents = read_bibtex(str_bibtex)
    add_db_papers(contents)
    return json.jsonify(contents)

@app.route('/bibtex/export', methods=['GET','POST'])
def export_bibtex():
    bibtex_entries = json.loads(request.data)
    return write_bibtex(bibtex_entries)

@app.route('/paper/all', methods=['GET','POST'])
def all_papers():
    results = get_db_papers()
    for r in results:
        r.pop('_id', None)
    return json.jsonify(results)

@app.route('/paper/update', methods=['GET','POST'])
def update_paper():
    str = json.loads(request.data)
    old = str["old"]
    new = str["new"]
    updated = update_db_paper(old, new)
    updated.pop('_id', None)
    return json.jsonify(updated)

@app.route('/paper/delete', methods=['GET','POST'])
def delete_paper():
    str = json.loads(request.data)
    paper = str["paper"]
    delete_db_paper(paper)
    return json.jsonify({})

@app.route('/paper/add', methods=['GET','POST'])
def get_paper_cands():
    obj = json.loads(request.data)
    candidates = search_by_title(obj)
    return json.jsonify(candidates)

@app.route('/paper/filter', methods=['GET','POST'])
def filter_paper():
    # print(request.data)
    obj = json.loads(request.data)
    filtered = search_paper(obj['criteria'])
    return json.jsonify(filtered)