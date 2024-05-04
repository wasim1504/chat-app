const WebSocket = require("ws");
const { publishToKafka } = require("../../src/../config/kafka");
const { Message } = require("../models/Messages");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("New Client/User Connected");

  Message.findAll()
    .then((messages) => {
      messages.forEach((message) => {
        ws.send(message.message);
      });
    })
    .catch((err) => {
      console.error("Error fetching messages from database:", err);
    });

  ws.on("message", async function incoming(message) {
    console.log("Received: %s", message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

    try {
      const newMessage = await Message.create({ message });

      await publishToKafka(message);

      console.log("Msg stored in DB:", newMessage);
    } catch (error) {
      console.error("Error storing msg in DB:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client/User disconnected");
  });
});
