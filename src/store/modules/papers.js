import paperOperator from '../../api/paperOperator'

// initial state
// shape: [{ id, {paper obj}}]
const state = {
    all: [],
    uploadState: null,
    currSelections: [],
}

// getters
const getters = {}

// actions
const actions = {
    getAllPapers ({ commit }) {
        paperOperator.getPapers()
            .then(papers => {
                commit('setPapers', JSON.parse(papers));
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
                commit('setUploadError');
            });
    },

    resetUploadState({commit}) {
        commit('setUploadError');
    },

    updatePaperInfo({commit}, {pid, paper}) {
        commit('setPaperInfo', {pid, paper});
    }
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
        state.uploadState = true;
    },

    setUploadError(state) {
        state.uploadState = false;
    },

    setPaperInfo(state, {pid, paper}) {
        const idx = state.all.findIndex(elmt => elmt.id === pid);
        state.all[idx] = paper;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
