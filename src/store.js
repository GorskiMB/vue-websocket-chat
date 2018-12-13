import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: 'user',
    wsClient: null,
    chatCount: 0,
    chatLimit: 50,
    chatData: [],
  },

  mutations: {
    // Set nickname
    setNickname(state, {nickname}) {
      state.nickname = nickname;
    },

    // Set WebSocket client
    setWSClient(state, {webSocket}) {
      state.wsClient = webSocket;
    },

    // Append message to the chat list
    addChat(state, {type, data}) {
      state.chatData.push({
        id: state.chatCount++,
        type: type,
        data: data
      });

      // Remove first message in the list if over limit
      if (state.chatData.length > state.chatLimit) {
        state.chatData.shift();
      }
    }
  },

  actions: {

  },
});
