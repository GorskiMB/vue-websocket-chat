// JSON.stringify(data)
// JSON.parse(data)

// Import modules
const isJSON      = require('is-valid-json'),
      WebSocket   = require('ws'),
      fileSystem  = require('fs');

// Import Configuration file
let config = {
  path: './server.config.json'
};

if (fileSystem.existsSync(config.path)) {
  config = JSON.parse(fileSystem.readFileSync(config.path, 'utf8'));
}

// Declare constant variables
const wsPort          = config.wsPort || 80,  // The port the WebSocket server listens on
      clients         = [],         // Array of Clients
      wsFunctions     = {},         // Object of server request functions
      wsFunctionsMap  = new Map();  // Map of server request functions

// General functions
const isSet = variable => {
  return !(typeof variable === 'undefined' || variable === null);
};

// Initialization function
const init = () => {
  // Map server request functions
  Object.entries(wsFunctions).forEach(func => {
    wsFunctionsMap.set(func[0], func[1]);
  });

  // Start the WebSocket server
  startWSServer(WebSocket);
};

// Server functions
const startWSServer = webSocket => {
  console.info(`Starting WebSocket server on port ${wsPort}`);

  // Create the WebSocket server
  const wss = new webSocket.Server({
    port: wsPort,
  });

  // Handle WebSocket connection event
  wss.on('connection', wsConnection);
};

const wsConnection = ws => {
  console.log('[WS] Connection');

  // Handle WebSocket client events
  ws.on('message', message => {
    let request = {
      content: message,
      client: ws
    };
    wsMessage(request);
  });
  ws.on('close', wsClose);
};

const wsMessage = message => {
  console.log('[WS] Message Recieved:', message.content);
  if (isJSON(message.content)) {
    incomingMessage(message.client, JSON.parse(message.content));
  }

  else {
    incomingMessageError(message.client, `Invalid JSON format`);
  }
};

const wsClose = client => {
  wsFunctionsMap.get('leaveChat')(client);
  console.log('[WS] Disconnected');
};

const incomingMessage = (client, data) => {
  if (!isSet(data.action)) {
    incomingMessageError(client, `action is missing`);
    return;
  }

  if (!wsFunctionsMap.has(data.action)) {
    incomingMessageError(client, `No such action`);
    return;
  }

  wsFunctionsMap.get(data.action)(client, data);
};

const incomingMessageError = (client, error) => {
  client.send(JSON.stringify({
    error: error
  }));
};

const broadcast = data => {
  if (clients.length > 0) {
    clients.forEach(client => {
      client.send(JSON.stringify(data));
    });
  }
};

// Server request functions
wsFunctions.joinChat = (client, data) => {
  if (!isSet(data.nickname)) {
    incomingMessageError(client, `nickname is missing`);
    return;
  }

  if (clients.indexOf(client) != -1) {
    incomingMessageError(client, `Client already joined`);
    return;
  }

  client.nickname = data.nickname;
  broadcast({
    action: 'broadcast',
    message: `${data.nickname} has joined!`
  });
  clients.push(client);
  client.send(JSON.stringify({
    action: 'broadcast',
    message: `Welcome ${data.nickname}!`
  }));
};

wsFunctions.leaveChat = (client) => {
  if (clients.length) {
    let index = clients.indexOf(client);
    if (index != -1) {
      let nickname = client.nickname;
      clients.splice(index, 1);
      broadcast({
        action: 'broadcast',
        message: `${nickname} has left.`
      });
    }
  }
};

wsFunctions.sendChat = (client, data) => {
  if (!isSet(data.message)) {
    incomingMessageError(client, `message is missing`);
    return;
  }

  broadcast({
    action: 'incomingChat',
    data: {
      time: Date.now(),
      name: client.nickname,
      message: data.message
    }
  });
};

wsFunctions.changeNickname = (client, data) => {
  if (!isSet(data.nickname)) {
    incomingMessageError(client, `nickname is missing`);
    return;
  }

  let oldNickname = client.nickname;
  client.nickname = data.nickname;
  broadcast({
    action: 'broadcast',
    message: `${oldNickname} is now known as ${data.nickname}`
  });
};

// Run Initialization
init();
