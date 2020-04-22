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

    addPaperToDatabase () {
    },

    deletePaperFromDatabase () {
    },

    addPaperToSelection () {
    },

    uploadByBibTex({commit}, file) {
        return paperOperator.uploadBibTex(file)
            .then(bibtexDatabase => {
                console.log(bibtexDatabase);
                commit('addFromBibTex', JSON.parse(bibtexDatabase));
            },
            error => {
                console.log(error);
                Promise.reject(error);
            });
    },
}

// mutations
const mutations = {
    setPapers (state, papers) {
        state.all = papers
    },

    pushPaperToLiterature () {
    },

    // maybe do not need
    markPaperSelected() {
    },

    removePaperFromLiterature () {
    },

    addFromBibTex(state, db) {
        state.all = state.all.concat(db);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
