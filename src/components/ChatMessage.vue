<template>
  <li v-if="data.action == 'welcomeClient'" class="welcomeMessage">
    <p class="message">Välkommen <strong>{{data.nickname}}</strong>!</p>
  </li>

  <li v-else-if="data.action == 'clientJoin'" class="welcomeMessage">
    <p class="message"><strong>{{data.nickname}}</strong> är här!</p>
  </li>

  <li v-else-if="data.action == 'clientLeave'" class="welcomeMessage">
    <p class="message"><strong>{{data.nickname}}</strong> lämnade.</p>
  </li>

  <li v-else class="chatMessage" v-bind:class="{me: isMe}">
    <span class="name">{{data.name}}</span>
    <div class="chatBubble">
      <p class="message">{{data.content}}</p>
      <span class="time">{{timeFormatted}}</span>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ChatMessage',

  props: {
    data: Object
  },

  data () {
    return {
      app: this.$root.$children[0],
      timeFormatted: new Date(this.data.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: this.data.me === true,
    }
  },

  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$chatBubbleColor: #41b883;
$meChatBubbleColor: #35495e;
$chatPointerSize: 6px;
$borderRadius: 3px;

.welcomeMessage {
  text-align: center;
  font-size: 11pt;
}

.chatMessage {
  margin: 10px 0px;
  padding-left: $chatPointerSize;

  .name {
    display: block;
    color: #444;
    font-weight: bold;
  }

  .chatBubble {
    display: inline-block;
    position: relative;
    background-color: $chatBubbleColor;
    color: #fff;
    padding: 8px;
    border-radius: $borderRadius;
    border-top-left-radius: 0;

    .message {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
    }

    .time {
      font-size: 9pt;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: -$chatPointerSize * 2;
      border: $chatPointerSize solid $chatBubbleColor;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }
  }
}

.chatMessage.me {
  padding-left: 0;
  padding-right: $chatPointerSize;
  text-align: right;

  .chatBubble {
    background-color: $meChatBubbleColor;
    color: #eee;
    border-top-left-radius: $borderRadius;
    border-top-right-radius: 0;

    &::after {
      left: auto;
      right: -$chatPointerSize * 2;
      border-top-color: $meChatBubbleColor;
      border-left-color: $meChatBubbleColor;
      border-right-color: transparent;
    }
  }
}
</style>
