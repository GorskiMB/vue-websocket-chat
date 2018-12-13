<template>
  <div class="modal" v-if="showModal">
    <Welcome />
  </div>
</template>

<script>
import Welcome from './Welcome';

export default {
  name: 'Modal',

  components: {
    Welcome,
  },

  data () {
    return {
      app: this.$root.$children[0],
      showModal: true,
    }
  },

  methods: {
    // Hide modal
    hideModal: function() {
      this.showModal = false;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.7);
  z-index: 999;
}
</style>
