<template>
  <form class="chatInput" @submit.prevent="handleSubmit">
    <input type="text" value="" placeholder="Meddelande..." v-model="chatMessage" autofocus>
    <button type="submit">
      <i class="fas fa-paper-plane"></i>
    </button>
  </form>
</template>

<script>
export default {
  name: 'ChatInput',

  props: {
    msg: String
  },

  data () {
    return {
      app: this.$root.$children[0],
      chatMessage: '',
    }
  },

  methods: {
    // Handle the message when submitted
    handleSubmit: function() {
      let message = this.chatMessage.trim();
      if (message) {
        let ws = this.$store.state.wsClient;
        // Send chat message to server
        ws.send(JSON.stringify({
          action: 'sendChat',
          message: message,
        }));

        // Clear the message input field
        this.chatMessage = '';
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chatInput {
  display: flex;
  background-color: #fff;

  input {
    padding: 10px;
    font-size: 12pt;
    width: 100%;
  }

  button {
    background-color: #41b883;
    padding: 10px;
    color: #fff;
  }
}
</style>
