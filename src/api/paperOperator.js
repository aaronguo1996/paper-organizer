
/* mocking client server  */
const _papers = [
    { id: 1, title: 'Higher-Order Pattern Complement and the Strict λ-Calculus', authors: ['Momigliano, Alberto', 'Pfenning, Frank'], journal: 'ACM Transactions on Computational Logic', journal_abbr: 'TOCL', year: 2003, tags: ['higher-order', 'logic'], created_time: '2020-04-19' },
    { id: 2, title: 'Synthesizing datalog programs using numerical relaxation', authors: ['Si, Xujie', 'Raghothaman, Mukund', 'Heo, Kihong', 'Naik, Mayur'], journal: 'International Joint Conference on Artificial Intelligence', journal_abbr: 'IJCAI', year: 2019, tags: [], created_time: '2020-04-18'},
    { id: 3, title: 'TYPES AS INTERVALS', authors: ['Cartwright, Robert'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1985, tags: ['type system'], created_time: '2020-04-10' },
    { id: 4, title: 'Finding the source of type errors', authors: ['Wand, Mitchell'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1986, tags: ['type system'], created_time: '2020-03-12' },
    { id: 5, title: 'Higher-Order Pattern Complement and the Strict λ-Calculus', authors: ['Momigliano, Alberto', 'Pfenning, Frank'], journal: 'ACM Transactions on Computational Logic', journal_abbr: 'TOCL', year: 2003, tags: ['higher-order', 'logic programming'], created_time: '2020-04-19' },
    { id: 6, title: 'Synthesizing datalog programs using numerical relaxation', authors: ['Si, Xujie', 'Raghothaman, Mukund', 'Heo, Kihong', 'Naik, Mayur'], journal: 'International Joint Conference on Artificial Intelligence', journal_abbr: 'IJCAI', year: 2019, tags: [], created_time: '2020-04-18'},
    { id: 7, title: 'TYPES AS INTERVALS', authors: ['Cartwright, Robert'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1985, tags: ['type system'], created_time: '2020-04-10' },
    { id: 8, title: 'Finding the source of type errors', authors: ['Wand, Mitchell'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1986, tags: ['type system'], created_time: '2020-03-12' },
    { id: 9, title: 'Higher-Order Pattern Complement and the Strict λ-Calculus', authors: ['Momigliano, Alberto', 'Pfenning, Frank'], journal: 'ACM Transactions on Computational Logic', journal_abbr: 'TOCL', year: 2003, tags: ['higher-order', 'logic programming'], created_time: '2020-04-19' },
    { id: 10, title: 'Synthesizing datalog programs using numerical relaxation', authors: ['Si, Xujie', 'Raghothaman, Mukund', 'Heo, Kihong', 'Naik, Mayur'], journal: 'International Joint Conference on Artificial Intelligence', journal_abbr: 'IJCAI', year: 2019, tags: [], created_time: '2020-04-18'},
    { id: 11, title: 'TYPES AS INTERVALS', authors: ['Cartwright, Robert'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1985, tags: ['type system'], created_time: '2020-04-10' },
    { id: 12, title: 'Finding the source of type errors', authors: ['Wand, Mitchell'], journal: 'Conference Record of the Annual ACM Symposium on Principles of Programming Languages', journal_abbr: 'POPL', year: 1986, tags: ['type system'], created_time: '2020-03-12' },
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

export default {
    getPapers,
    addPaper,
    deletePaper,
}
