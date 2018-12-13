<template>
  <div class="welcome">
    <h1>Vue Realtid Chat</h1>
    <form id="chatInput" @submit.prevent="setNickname">
      <input type="text" value="" placeholder="Smeknamn..." v-model="nickname" autofocus>
      <button type="submit">
        <i class="fas fa-sign-in-alt"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Welcome',

  props: {
    msg: String
  },

  data () {
    return {
      app: this.$root.$children[0],
      nickname: "",
    }
  },

  methods: {
    // Set nickname
    setNickname: function() {
      // Set nickname in vue store
      this.$store.commit('setNickname', {
       nickname: this.nickname
      });

      // Join chat
      this.app.joinChat(this.nickname);
      // Hide nickname modal
      this.$parent.hideModal();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome {
  box-shadow: 0 0 20px -10 #000;
  background-color: #fff;
  color: #444;

  h1 {
    font-weight: bold;
    font-size: 12pt;
    padding: 10px;
  }

  form {
    display: flex;
  }

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
