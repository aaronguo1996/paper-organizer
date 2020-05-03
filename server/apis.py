import bibtexparser
from bibtexparser.bparser import BibTexParser
from database import *

def read_bibtex(bibtex_str):
    parser = BibTexParser(common_strings=True)
    parser.ignore_nonstandard_types = False
    parser.homogenize_fields = True
    bib_database = parser.parse(bibtex_str)
    keyworded = map(bibtexparser.customization.keyword, bib_database.entries)
    converted = map(bibtexparser.customization.convert_to_unicode, keyworded)
    authored = map(bibtexparser.customization.author, converted)
    return list(authored)

def add_db_papers(results):
    # store results to the database
    db = create_connection()
    # this has side effect, it will consume and modify the objects!
    insert_many_papers(db, results)
    # restore parsed results
    for r in results:
        r.pop('_id', None)
    return results

def get_db_papers():
    db = create_connection()
    return get_all_papers(db)

def update_db_paper(old, new):
    db = create_connection()
    return update_one_paper(db, old, new)

def delete_db_paper(paper):
    db = create_connection()
    return delete_one_paper(db, paper)

def search_google_research(paper):
    search_query = scholarly.search_pubs_query(paper['title'])
    q = next(search_query).fill()
    print(q.bib)
