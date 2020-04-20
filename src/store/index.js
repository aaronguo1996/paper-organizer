import Vue from 'vue'
import Vuex from 'vuex'
import papers from './modules/papers'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
      papers
  },
  strict: debug,
})
