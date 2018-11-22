<template>
  <div class="welcome">
    <h1>Vue Realtid Chat</h1>
    <input type="text" v-model="nickname" placeholder="Smeknamn...">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      nickname: ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
