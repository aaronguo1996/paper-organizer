import time
from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
from apis import read_bibtex
import json

_HEADERS = {
    'accept-language': 'en-US,en',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml'
    }
_CANDIDATE_LIMIT = 3
_DBLP_HOST = "https://dblp.org/search/publ/api?format=json&q="

def search_by_title(paper_info):
    print(paper_info)
    query = f"{paper_info['title']}+{'+'.join(paper_info['author'])}"
    quoted_title = urllib.parse.quote(query)
    url = f'{_DBLP_HOST}{quoted_title}'
    print(url)
    req = urllib.request.Request(url=url)

    with urllib.request.urlopen(req) as f:
        json_doc = f.read()
        json_obj = json.loads(json_doc)
        # get the first 10 results
        json_pubs = json_obj['result']['hits']['hit'][:10]
        return list(map(lambda c: get_bibtex(c['info']),
                        json_pubs))

def get_bibtex(info):
    url = info['url']
    bibtex_url = url.replace('dblp.org/rec/','dblp.org/rec/bibtex/')
    req = urllib.request.Request(url=bibtex_url)
    with urllib.request.urlopen(req) as f:
        html_doc = f.read()
        soup = BeautifulSoup(html_doc, 'html.parser')
        bibtex_div = soup.find(id='bibtex-section')
        bibtex_str = bibtex_div.pre.contents[0]
        bibtex_obj = read_bibtex(bibtex_str)[0]
        return bibtex_obj
