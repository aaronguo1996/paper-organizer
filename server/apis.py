import bibtexparser
from bibtexparser.bparser import BibTexParser
from database import *

def read_bibtex(bibtex_str):
    parser = BibTexParser()
    parser.ignore_nonstandard_types = False
    parser.homogenize_fields = True
    bib_database = parser.parse(bibtex_str)
    keyworded = map(bibtexparser.customization.keyword, bib_database.entries)
    converted = map(bibtexparser.customization.convert_to_unicode, keyworded)
    authored = map(bibtexparser.customization.author, converted)
    results = list(authored)
    # store results to the database
    db = create_connection()
    # this has side effect, it will consume and modify the objects!
    insert_many_papers(db, results)
    # return parsed results
    for r in results:
        r.pop('_id', None)
    return results

def get_db_papers():
    db = create_connection()
    return get_all_papers(db)
