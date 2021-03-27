import socketIOClient from "socket.io-client";

export default function getSocket() {
  return socketIOClient(`http://localhost:4000/ws`, {
    transports: ["websocket"],
    upgrade: false,
  });
}
