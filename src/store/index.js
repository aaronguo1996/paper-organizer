import Vue from 'vue'
import Vuex from 'vuex'
import papers from './modules/papers'
import tasks from './modules/tasks'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        papers,
        tasks,
    },
    plugins: [createLogger()],
    strict: debug,
    state: {
        displayStack: 'allPapers'
    },
    actions: {
        changeDisplay({commit}, name) {
            commit('setDisplay', name);
        }
    },
    mutations: {
        setDisplay(state, name) {
            state.displayStack = name;
        }
    }
})
