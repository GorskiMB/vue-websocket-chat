<template>
  <main class="mainPanel">
    <header class="chatHeader">{{$store.state.nickname}}</header>
    <ChatView />
    <ChatInput />
  </main>
</template>

<script>
import ChatView from './ChatView';
import ChatInput from './ChatInput';

export default {
  name: 'MainPanel',

  components: {
    ChatView,
    ChatInput,
  },

  props: {
    msg: String
  },

  data () {
    return {
      app: this.$root.$children[0],
      channel: 'kanal',
    }
  },

  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px #000;
  overflow: hidden;
}

header {
  background-color: #35495e;
  color: #eee;
  font-size: 14pt;
  padding: 12px;
  z-index: 1;

  span {
    color: #888;
    font-weight: bold;
  }
}
</style>
