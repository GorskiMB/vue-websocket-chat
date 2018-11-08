const webSocketChat = () => {
  console.log('Starting WebSocket Server...');

  let WebSocket = require('ws');
  let wss = new WebSocket.Server({
    port: 80,
  });

  wss.on('connection', ws => {
    console.log('[WS] Connection');
    ws.send("Chat welcome!");

    ws.on('message', message => {
      console.log("[WS][Message]", message);
      ws.send("Message recieved! " + message);
    });

    ws.on('close', () => {
      console.log('[WS] Disconnected');
    });
  });

  return this;
};

module.exports = webSocketChat;
