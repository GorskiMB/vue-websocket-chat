<template>
  <aside class="panel">

  </aside>
</template>

<script>
export default {
  name: 'Panel',

  props: {
    msg: String
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
.panel {
  background-color: #fff;
  padding: 10px;
  max-width: 250px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px #000;
  box-sizing: border-box;
  margin-right: 24px;
}
</style>
