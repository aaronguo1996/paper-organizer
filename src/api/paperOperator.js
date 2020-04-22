import {baseRoute} from './utilities'

/* mocking client server  */
const _papers = [
    { id: 1, title: 'Higher-Order Pattern Complement and the Strict λ-Calculus', author: ['Momigliano, Alberto', 'Pfenning, Frank'], journal: 'ACM Transactions on Computational Logic', journal_abbr: 'TOCL', year: 2003, tags: ['higher-order', 'logic'], created_time: '2020-04-19' },
    { id: 2, title: 'Synthesizing datalog programs using numerical relaxation', author: ['Si, Xujie', 'Raghothaman, Mukund', 'Heo, Kihong', 'Naik, Mayur'], journal: 'International Joint Conference on Artificial Intelligence', journal_abbr: 'IJCAI', year: 2019, tags: [], created_time: '2020-04-18'},
    { id: 3, title: 'TYPES AS INTERVALS', author: ['Cartwright, Robert'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1985, tags: ['type system'], created_time: '2020-04-10' },
    { id: 4, title: 'Finding the source of type errors', author: ['Wand, Mitchell'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1986, tags: ['type system'], created_time: '2020-03-12' },
]

const getPapers = (cb) => {
    setTimeout(() => cb(_papers), 10)
}

const addPaper = (cb, paper) => {
    setTimeout(() => cb(paper), 10)
}

const deletePaper = (cb, paper) => {
    setTimeout(() => cb(paper), 10)
}

const uploadBibTex = (file) => {
    const ROUTE = baseRoute + "import/bibtex";

    const fetchOpts = {
        method: 'POST', // or 'PUT'
        body: file,
    };

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
}

export default {
    getPapers,
    addPaper,
    deletePaper,
    uploadBibTex,
}
