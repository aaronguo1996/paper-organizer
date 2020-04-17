// initial state
// shape: [{ id, {paper obj}}]
const state = {
    literatures: [],
    currSelections: [],
}

// getters
const getters = {
    literatureDetails: (state, getters) => {
        return state.literatures;
    },

    selectedLiteratures: (state, getters) => {
    }
}

// actions
const actions = {
    addPaperToDatabase ({commit, state}, paper) {
    },

    deletePaperFromDatabase ({commit, state}, paper) {
    },

    addPaperToSelection ({commit, state}, paper) {
    },
}

// mutations
const mutations = {
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
