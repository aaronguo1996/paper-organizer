import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.bwriter import BibTexWriter
from pylatexenc.latexencode import unicode_to_latex
from database import *

def read_bibtex(bibtex_str):
    parser = BibTexParser(common_strings=True)
    parser.ignore_nonstandard_types = False
    parser.homogenize_fields = True
    bib_database = parser.parse(bibtex_str)
    keyworded = map(bibtexparser.customization.keyword, bib_database.entries)
    converted = list(map(bibtexparser.customization.convert_to_unicode, keyworded))
    authored = map(bibtexparser.customization.author, converted)
    return list(authored)

def write_bibtex(bibtex_entries):
    bib_database = bibtexparser.bibdatabase.BibDatabase()

    for e in bibtex_entries:
        # pop the useless contents
        e.pop('created_time', None)
        e.pop('file', None)
        e.pop('abstract', None)
        for k in e:
            if isinstance(e[k], list):
                e[k] = ' and '.join(e[k])
            e[k] = unicode_to_latex(e[k])
    bib_database.entries = bibtex_entries

    writer = BibTexWriter()
    writer.contents = ['comments', 'entries']
    writer.indent = '  '
    writer.order_entries_by = ('ENTRYTYPE', 'author', 'year')
    bibtex_str = bibtexparser.dumps(bib_database, writer)

    return bibtex_str

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

def search_paper(criteria):
    db = create_connection()
    papers = get_all_papers(db, criteria=criteria)
    for p in papers:
        p.pop('_id', None)
    return papers