<template>
  <div id="app">
    <Modal />
    <!--<Panel />-->
    <MainPanel />
  </div>
</template>

<script>
import Modal from './components/Modal';
import MainPanel from './components/MainPanel';
//import Panel from './components/Panel';
import store from './store';

export default {
  name: 'App',

  components: {
    Modal,
    //Panel,
    MainPanel,
  },

  data () {
    return {

      /*** Client functions ***/
      wsFunctions: {

        // Handle welcome alert
        welcomeClient: function(data) {
          // Add it to chat list
          store.commit('addChat', {
           type: data.action,
           data: data,
          });
        },

        // Handle joined user alert
        clientJoin: function(data) {
          // Add it to chat list
          store.commit('addChat', {
           type: data.action,
           data: data,
          });
        },

        // Handle user left alert
        clientLeave: function(data) {
          // Add it to chat list
          store.commit('addChat', {
           type: data.action,
           data: data,
          });
        },

        // Handle user nickname change alert
        nicknameChange: function(data) {
          console.debug('nicknameChange', data.oldNickname, data.newNickname)
        },

        // Handle incoming chat message
        incomingChat: function(data) {
          // Add it to chat list
          store.commit('addChat', {
           type: data.action,
           data: data.data
          });
        }
      },

      // Create a Map object
      wsFunctionsMap: new Map(),
    }
  },

  methods: {

    // Convert a URL to a WebSocket URL
    convertURItoWS: function(uri) {
      let loc = uri, new_uri;

      // Set TLS protocol if appropiate
      if (loc.protocol === "https:") {
          new_uri = "wss:";
      } else {
          new_uri = "ws:";
      }

      // Set url to localhost if opened from a file
      if (loc.protocol === "file:") {
        new_uri += "//localhost";
      } else {
        new_uri += "//" + loc.hostname;
      }
      return new_uri;
    },

    // Create and connect WebSocket client
    initWebSocket: function() {
      let ws = new WebSocket(this.convertURItoWS(window.location));

      // Handle incoming request from server
      ws.onmessage = event => {
        // Parse the request
        let data = JSON.parse(event.data);

        // Check if action exists
        if (this.wsFunctionsMap.has(data.action)) {
          // Run requested action
          this.wsFunctionsMap.get(data.action)(data);
        }

        // Handle error if action doesn't exist
        else {
          console.warn(`Action '${data.action}' doesn't exist.`);
        }
      };

      // Save WebSocket client in vuex store
      store.commit('setWSClient', {
        webSocket: ws
      });
    },

    // Request server to join chat
    joinChat: nickname => {
      store.state.wsClient.send(JSON.stringify({
        action: 'joinChat',
        nickname: nickname
      }));
    },

    // Initalization
    initialize: function() {

      // Map client functions
      Object.entries(this.wsFunctions).forEach(func => {
        this.wsFunctionsMap.set(func[0], func[1]);
      });

      // Run WebSocket initialization
      this.initWebSocket();
    },
  },

  // Run initialization when the app is loaded
  beforeMount() {
    this.initialize();
  },
}
</script>

<style lang="scss">

/*** Variables ***/
$widthThreshold: 800px;
$heightThreshold: 600px;
$panelPadding: 50px;

/*** Input style reset ***/
/* https://gist.github.com/mjlescano/fc472f778e77c4b760ab */
@import 'scss/form-reset-helpers.scss';
@import 'scss/form-reset.scss';

.shadow {
  box-shadow: 0 0 10px -4px #000;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  background-color: #41b883;
  height: 100vh;
  width: 100vw;
  position: relative;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .chatHeader,
  .chatInput {
    @extend .shadow;
  }
}

@media screen and (min-width: $widthThreshold + 1) {
  .mainPanel {
    max-width: 600px;
  }

  @media screen and (min-height: $heightThreshold + $panelPadding + 1) {
    #app {
      padding: $panelPadding 0;
    }
  }
}
</style>
