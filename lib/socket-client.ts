import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket;
}

export function connectSocket(userId: string): void {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
    s.once("connect", () => {
      s.emit("join", { userId });
    });
  } else {
    s.emit("join", { userId });
  }
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}
