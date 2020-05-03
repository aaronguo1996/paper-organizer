import taskOperator from '../../api/taskOperator'

const state = {
    all: [],
}

const getters = {}

const actions = {
    addTask({commit}, {paper, task}) {
        return taskOperator.addTask({paper, task})
            .then(() => {
                const newTask = {...task, paper}
                commit('pushTask', {newTask});
            })
    },
}

const mutations = {
    pushTask({state}, {newTask}) {
        state.all = state.all.concat(newTask);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
