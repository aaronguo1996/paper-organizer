import bibtexparser
from bibtexparser.bparser import BibTexParser

def read_bibtex(bibtex_str):
    parser = BibTexParser()
    parser.ignore_nonstandard_types = False
    parser.homogenize_fields = True
    bib_database = parser.parse(bibtex_str)
    keyworded = map(bibtexparser.customization.keyword, bib_database.entries)
    converted = map(bibtexparser.customization.convert_to_unicode, keyworded)
    authored = map(bibtexparser.customization.author, converted)
    return list(authored)
