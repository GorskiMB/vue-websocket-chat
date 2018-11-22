import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wsClient: null
  },
  mutations: {

  },
  actions: {

  },
  methods: {
    setWSClient(webSocket) {
      this.wsClient = webSocket;
    }
  }
})
