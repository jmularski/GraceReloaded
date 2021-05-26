import { Message } from "../../src/models";

/* eslint-disable no-undef */
const io = require("socket.io-client");

const ioOptions = {
  transports: ["websocket"],
  forceNew: true,
  reconnection: false,
};

const data = {
  message: "what patients have the condition viral sinusitis (disorder)?",
  response: "This patients with this condition are: Mr.Aaron697 Brekke496",
};

describe("Chat Events", () => {
  it("client should receive a correct answer", (done) => {
    const sender = io("/", ioOptions);

    sender.emit("chatMessage", data.message);

    sender.on("message", (msg: Message) => {
      expect(msg.message).toEqual(data.response);
    });

    sender.disconnect();
    done();
  });
});