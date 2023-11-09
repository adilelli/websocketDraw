const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) {
  console.log('Connected to the WebSocket server.');
};

// Listen for messages from the server
socket.addEventListener('message', (event) => {
  console.log('Received message from server:', event.data);
  // You can do something with the received data here
});

socket.onclose = function (event) {
  console.log('Connection closed.');
};

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isDrawing = false;

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Event listener for touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(event) {
  isDrawing = true;
  const { offsetX, offsetY } = getOffset(event);
  context.beginPath();
  context.moveTo(offsetX, offsetY);
}

function draw(event) {
  if (!isDrawing) return;
  event.preventDefault();
  const { offsetX, offsetY } = getOffset(event);
  context.lineTo(offsetX, offsetY);
  context.stroke();
  sendMessage(offsetX, offsetY);
}

function stopDrawing() {
  isDrawing = false;
}

function getOffset(event) {
  let offsetX, offsetY;
  if (event.offsetX) {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
  } else if (event.touches) {
    offsetX = event.touches[0].pageX - canvas.offsetLeft;
    offsetY = event.touches[0].pageY - canvas.offsetTop;
  }
  return { offsetX, offsetY };
}

function sendMessage(dx, dy) {
  const user = "Adil";
  const user_x = dx;
  const user_y = dy;

  const message = {
    user,
    user_x,
    user_y,
  };

  socket.send(JSON.stringify(message));
}


