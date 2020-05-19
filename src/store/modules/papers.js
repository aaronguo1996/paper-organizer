import paperOperator from '../../api/paperOperator'
import Vue from 'vue'

// initial state
// shape: [{ id, {paper obj}}]
const state = {
    // persistent states
    all: [],
    // temporary states
    filters: [],
    uploadState: null,
    exportSelections: [],
    addCandidates: [],
}

// getters
const getters = {
}

// actions
const actions = {
    getAllPapers ({ commit }) {
        paperOperator.getPapers()
            .then(papers => {
                const all = JSON.parse(papers);
                commit('setPapers', all);
            })
    },

    getPossiblePaper: ({commit}, {paper}) => {
        return paperOperator.addPaper(paper)
            .then(papers => {
                commit('candPapers', JSON.parse(papers));
            });
    },

    deletePaperFromDatabase ({commit}, paper) {
        paperOperator.deletePaper(paper)
            .then(() => {
                commit('removePaper', paper);
            });
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

    updatePaperInfo({commit}, {old, paper}) {
        return paperOperator.updatePaper(old, paper)
            .then(updatedPaper => {
                commit('setPaperInfo', {updatedPaper:JSON.parse(updatedPaper)});
            })
    },

    updatePaperField({commit}, {paper, field, v}) {
        commit('setPaperField', {paper, field, v});
    },

    updatePaperFieldForce({commit}, {paper, field, v}) {
        commit('setPaperFieldForce', {paper, field, v});
    },

    filterPaperBy({commit}, {criteria, display}) {
        return paperOperator.filterPapers({criteria})
            .then(newPaperList => {
                commit('addFilter', {criteria, display});
                commit('setPapers', JSON.parse(newPaperList));
            })
    },

    removeFilter({commit, state}, filter) {
        const filters = state.filters.filter(elmt => elmt !== filter)
        console.log(filters);
        // merge filters
        const criteria = filters.reduce((acc, elmt) => {
            const cr = elmt.criteria;
            return {'$and': [cr, acc]};
        }, {})
        return paperOperator.filterPapers({criteria: criteria})
            .then(newPaperList => {
                commit('setFilter', filters);
                commit('setPapers', JSON.parse(newPaperList));
            })
    }
}

// mutations
const mutations = {
    setPapers (state, papers) {
        state.all = papers
    },

    pushPaper () {
    },

    // maybe do not need
    markPaperSelected() {
    },

    candPapers(state, papers) {
        state.addCandidates = papers;
    },

    removePaper(state, paper) {
        const idx = state.all.findIndex(elmt => elmt.ID === paper.ID);
        state.all.splice(idx, 1);
    },

    addFromBibTex(state, db) {
        state.all = state.all.concat(db);
        state.uploadState = true;
    },

    setUploadError(state) {
        state.uploadState = false;
    },

    setPaperInfo(state, {updatedPaper}) {
        const idx = state.all.findIndex(elmt => elmt.ID === updatedPaper.ID);
        state.all.splice(idx, 1, updatedPaper);
    },

    setPaperFieldForce({paper, field, v}) {
        Vue.delete(paper, field);
        Vue.set(paper, field, v);
    },

    setPaperField({paper, field, v}) {
        Vue.set(paper, field, v);
    },

    addFilter(state, {criteria, display}) {
        state.filters = state.filters.concat({criteria, display});
    },

    removeFilter(state, filter) {
        state.filters = state.filters.filter(elmt => elmt !== filter);
    },

    setFilter(state, filters) {
        state.filters = filters;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
