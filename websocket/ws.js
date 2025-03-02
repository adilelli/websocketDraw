const WebSocket = require('ws');

// Create a WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Define an object to store user data
const users = {};

// Define the event handlers for the WebSocket server
wss.on('connection', (ws) => {
  console.log(ws);
  // Send a welcome message to the connected client
  ws.send(JSON.stringify({1:1}));

  // Handle messages received from clients
  ws.on('message', (message) => {
    try {
      // Parse the incoming message as JSON
      const data = JSON.parse(message);

      // Extract the user data from the message
      const { user, user_x, user_y } = data;

      // Store the user data in the users object
      users[user] = {
        x: user_x,
        y: user_y,
      };

      // Log the updated user data
      console.log(`incoming_data: ${JSON.stringify(users)}`);
      // console.log(ws);
      ws.send(`${JSON.stringify(users)}`);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Handle the WebSocket connection closing
  ws.on('close', () => {
    // Clean up the user data when a client disconnects
    console.log(ws);
    Object.keys(users).forEach((user) => {
      if (users[user] === ws) {
        delete users[user];
      }
    });
    console.log('A client disconnected.');
  });
});

