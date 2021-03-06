const chatController = require('../controllers/chat');

module.exports = (io) => io.on('connection', async (_socket) => {
  const allMessages = await chatController.getAllMessages();
  io.emit('get-messages', allMessages);
});