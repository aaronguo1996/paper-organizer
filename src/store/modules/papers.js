import paperOperator from '../../api/paperOperator'
import Vue from 'vue'

// initial state
// shape: [{ id, {paper obj}}]
const state = {
    // persistent states
    all: [],
    currentPage: 1,
    // temporary states
    filters: [],
    uploadState: null,
    addCandidates: [],
}

// getters
const getters = {
    groupByTags(state) {
        const isYear = (tag) => /^\d+$/.test(tag);
        const isConf = (tag) => /^[A-Z]+$/.test(tag);
        const addTag = (tag, acc, elmt) => {
            const t = tag.charAt(0).toUpperCase() + tag.slice(1)
            if(t in acc) {
                acc[t] = acc[t].concat(elmt);
            } else {
                acc[t] = [elmt];
            }
            return acc;
        }
        return state.all.reduce((acc, elmt) => {
            if(!elmt['tags']) {
                if(acc['Topic']['Other']){
                    acc['Topic']['Other'] = acc['Topic']['Other'].concat(elmt);
                } else {
                    acc['Topic']['Other'] = [elmt];
                }
                return acc;
            } else {
                const tags = elmt['tags']
                for(const k in tags) {
                    const tag = tags[k];
                    if(isYear(tag)) {
                        acc['Year'] = addTag(tag, acc['Year'], elmt);
                    } else if(isConf(tag)) {
                        acc['Conference'] = addTag(tag, acc['Conference'], elmt);
                    } else {
                        acc['Topic'] = addTag(tag, acc['Topic'], elmt);
                    }
                }
                return acc;
            }
        }, {
            'Year': {},
            'Conference': {},
            'Topic': {},
        })
    },
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

    exportBibtex({commit},entries) {
        commit('setUploadError');
        return paperOperator.exportBibTex(entries);
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

    setPage({commit}, p) {
        commit('setPage', p);
    },

    filterPaperBy({commit}, {criteria, display}) {
        const filters = state.filters.map(elmt => elmt.criteria)
        const newCriteria = {'$and':filters.concat(criteria)}
        return paperOperator.filterPapers({ criteria: newCriteria })
            .then((newPaperList) => {
                commit('setPage', 1);
                commit('addFilter', { criteria, display });
                commit('setPapers', JSON.parse(newPaperList));
            })
        
    },

    removeFilter({commit, state}, filter) {
        const filters = state.filters
                            .filter(elmt => elmt !== filter)
                            .map(elmt => elmt.criteria);
        // console.log(filters);
        // merge filters
        const criteria = filters.length === 0 ? {} : {'$and': filters};
        return paperOperator.filterPapers({ criteria: criteria })
            .then((newPaperList) => {
                commit('setPage', 1);
                commit('setFilter', filters);
                commit('setPapers', JSON.parse(newPaperList));
            });
    },

    removeAllFilters({commit}) {
        return paperOperator.filterPapers({ criteria: {}})
            .then((newPaperList) => {
                commit('setPage', 1);
                commit('setFilter', []);
                commit('setPapers', JSON.parse(newPaperList));
            });
    },
}

// mutations
const mutations = {
    setPage(state, p) {
        state.currentPage = p;
    },

    setPapers (state, papers) {
        state.all = papers
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

    setPaperFieldForce(state, {paper, field, v}) {
        Vue.delete(paper, field);
        Vue.set(paper, field, v);
    },

    setPaperField(state, {paper, field, v}) {
        // console.log(field, v);
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
