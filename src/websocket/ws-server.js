const webSocketChat = () => {
  const isJSON = require('is-valid-json');

  console.log('Starting WebSocket Server...');
  // JSON.stringify(data)
  // JSON.parse(data)
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({
    port: 80,
  });

  const clients = [];
  const wsFunctions = new Map();

  const isSet = variable => {
    return !(typeof variable === 'undefined' || variable === null);
  };

  const incomingMessage = (client, data) => {
    if (!isSet(data.action)) {
      incomingMessageError(client, `action is missing`);
      return;
    }

    if (!wsFunctions.has(data.action)) {
      incomingMessageError(client, `No such action`);
      return;
    }

    wsFunctions.get(data.action)(client, data);
  };

  const incomingMessageError = (client, error) => {
    client.send(JSON.stringify({
      error: error
    }));
  };

  const broadcast = data => {
    if (clients.length > 0) {
      clients.forEach(client => {
        client.send(data);
      });
    }
  };

  wsFunctions.set('joinChat', (client, data) => {
    if (!isSet(data.nickname)) {
      incomingMessageError(client, `nickname is missing`);
      return;
    }

    if (clients.indexOf(client) != -1) {
      incomingMessageError(client, `Client already joined`);
      return;
    }

    client.nickname = data.nickname;
    broadcast(`${data.nickname} has joined!`);
    clients.push(client);
    client.send(`Welcome ${data.nickname}!`);
  });

  wsFunctions.set('leaveChat', (client) => {
    if (clients.length) {
      let index = clients.indexOf(client);
      if (index != -1) {
        let nickname = client.nickname;
        clients.splice(index, 1);
        broadcast(`${nickname} has left`);
      }
    }
  });

  wsFunctions.set('sendChat', (client, data) => {
    broadcast(`[${client.nickname}] ${data.message}`);
  });

  wss.on('connection', ws => {
    console.log('[WS] Connection');

    ws.on('message', message => {
      console.log('[WS] Message');
      if (isJSON(message)) {
        incomingMessage(ws, JSON.parse(message));
      }

      else {
        incomingMessageError(ws, `Invalid JSON format`);
      }
    });

    ws.on('close', () => {
      wsFunctions.get('leaveChat')(ws);
      console.log('[WS] Disconnected');
    });
  });

  return this;
};

module.exports = webSocketChat;
