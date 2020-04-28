import os
import pymongo
import bson
from datetime import datetime
import config

def create_connection():
    """ create a database connection to a MongoDB database """
    db = None
    try:
        db = pymongo.MongoClient().papers_database
    except Error as e:
        print(e)

    return db

def insert_one_paper(db, paper):
    """
    Create a new paper into the papers connection
    :param conn:
    :param paper: dictionary
    :return: paper id
    """
    paper_collection = db.papers
    paper["created_time"] = datetime.utcnow()
    return paper_collection.insert_one(paper).inserted_id

def insert_many_papers(conn, papers):
    """
    Create a list of new papers into the papers table
    :param conn:
    :param papers: list of dictionary
    :return: inserted paper ids
    """
    paper_collection = conn.papers
    for p in papers:
        p["created_time"] = datetime.utcnow()
    return paper_collection.insert_many(papers).inserted_ids

def get_all_papers(db, criteria = {}):
    cursor = db.papers.find_raw_batches(criteria)
    result = []
    for p in cursor:
        result += bson.decode_all(p)
    return result

def get_one_paper(db, criteria = {}):
    return bson.decode_all(db.papers.find_one(criteria))
