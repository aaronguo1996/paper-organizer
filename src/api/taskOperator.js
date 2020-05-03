import {fetch, baseRoute} from './utilities'

export const addTask = ({paper, task}) => {
    const route = baseRoute + '/task/add'

    const data = {paper, task}

    const fetchOpts = {
        method: 'POST',
        body: JSON.stringify(data),
    }

    return fetch(route, fetchOpts)
        .then(response => JSON.parse(response.text()));
}
