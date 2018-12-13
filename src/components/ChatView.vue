<template>
  <ul class="chatView">
    <ChatMessage v-for="chat in $store.state.chatData" v-bind:key="chat.id" v-bind:data="chat.data" />
  </ul>
</template>

<script>
import ChatMessage from './ChatMessage';

export default {
  name: 'ChatView',

  components: {
    ChatMessage,
  },

  props: {

  },

  data () {
    return {
      app: this.$root.$children[0],
    }
  },

  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chatView {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>
