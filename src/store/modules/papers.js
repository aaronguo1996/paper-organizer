import paperOperator from '../../api/paperOperator'

// initial state
// shape: [{ id, {paper obj}}]
const state = {
    all: [],
    currSelections: [],
}

// getters
const getters = {}

// actions
const actions = {
    getAllPapers ({ commit }) {
        paperOperator.getPapers(papers => {
            commit('setPapers', papers)
        })
    },

    addPaperToDatabase ({commit, state}, paper) {
    },

    deletePaperFromDatabase ({commit, state}, paper) {
    },

    addPaperToSelection ({commit, state}, paper) {
    },
}

// mutations
const mutations = {
    setPapers (state, papers) {
        state.all = papers
    },

    pushPaperToLiterature (state, {id}) {
    },

    // maybe do not need
    markPaperSelected(state, {id}) {
    },

    removePaperFromLiterature (state, {id}) {
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
