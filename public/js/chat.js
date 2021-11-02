const socket = window.io();

const userForm = document.getElementById('new-user-form');
const userInput = document.getElementById('new-user-input');
const userList = document.getElementById('users-list');
// const saveName = document.getElementById('save-nickname');

const textForm = document.getElementById('message-form');
const chatText = document.getElementById('text-input');
const chatMessages = document.getElementById('message-list');

let savedName;

const createUser = (allUsers, current) => {
  console.log(allUsers, current, savedName);
  userList.innerHTML = '';
  allUsers.forEach((user) => {
    const userLi = document.createElement('li');
    userLi.innerText = user;
    userLi.dataset.testid = 'online-user';
      if (current && (user === current)) {
        userList.prepend(userLi);
      } else { userList.appendChild(userLi); }
  });
};

const createMessage = async (msg) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = msg;
  messageLi.dataset.testid = 'message';
  chatMessages.appendChild(messageLi);
};

textForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = savedName;
  const chatMessage = chatText.value;
  socket.emit('message', { chatMessage, nickname });
  chatText.value = '';
  return false;
});

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('save-user', userInput.value);
  userInput.value = '';
  return false;
});

socket.on('new-user', (name, current) => {
  savedName = (name);
  createUser(name, current);
});

socket.on('get-messages', (arrayMessages) => {
  arrayMessages.forEach((message) => createMessage(message));
});

socket.on('new-connection', (name, currentUser) => createUser(name, currentUser));
socket.on('disconnected', (name, current) => createUser(name, current));

socket.on('message', (msg) => createMessage(msg));
