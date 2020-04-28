import {baseRoute} from './utilities'

/* mocking client server  */
const getPapers = () => {
    const ROUTE = baseRoute + "all";

    const fetchOpts = {
        method: 'GET', // or 'PUT'
    };

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
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
