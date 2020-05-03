import {baseRoute} from './utilities'

/* mocking client server  */
const getPapers = () => {
    const ROUTE = baseRoute + "paper/all";

    const fetchOpts = {
        method: 'GET', // or 'PUT'
    };

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
}

const addPaper = (paper) => {
    const ROUTE = baseRoute + "paper/add";

    const fetchOpts = {
        method: 'POST',
        body: JSON.stringify(paper)
    }

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
}

const addPapers = (papers) => {
    const ROUTE = baseRoute + "paper/adds";

    const fetchOpts = {
        method: 'POST',
        body: JSON.stringify(papers)
    }

    return fetch(ROUTE, fetchOpts)
        .then(response => JSON.parse(response.text()));
}

const updatePaper = (old, paper) => {
    const ROUTE = baseRoute + "paper/update";

    const data = {
        old: old,
        new: paper
    }

    const fetchOpts = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
}

const deletePaper = (paper) => {
    const ROUTE = baseRoute + "paper/delete";

    const data = {
        paper
    }

    const fetchOpts = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };

    return fetch(ROUTE, fetchOpts)
        .then(response => response.text());
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
    addPapers,
    deletePaper,
    updatePaper,
    uploadBibTex,
}
