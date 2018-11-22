<template>
  <div class="chat">
    <Welcome/>
    <ul class="chat-view">

    </ul>

    <form>
      <input class="input" type="text" placeholder="Message...">
    </form>

    <input type="text" v-model="nickname" v-on:keyup.13="joinChat(nickname)" placeholder="Smeknamn...">
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'

let convertURItoWS = uri => {
  let loc = uri, new_uri;
  if (loc.protocol === "https:") {
      new_uri = "wss:";
  } else {
      new_uri = "ws:";
  }

  if (loc.protocol === "file:") {
    new_uri += "//localhost";
  } else {
    new_uri += "//" + loc.hostname;
  }
  return new_uri
}

let ws = new WebSocket(convertURItoWS(window.location));

export default {
  name: 'home',
  components: {
    Welcome
  },
  methods: {
    joinChat(name) {
      ws.send(JSON.stringify({
        action: 'joinChat',
        nickname: name
      }));
    }
  }
}
</script>
