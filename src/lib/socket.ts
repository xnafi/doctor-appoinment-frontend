// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(URL, {
      path: "/socket.io",
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
    });
  }
  return socket;
}

export const SocketEvents = {
  QUEUE_UPDATED: "queue:updated",
  PATIENT_CALLED: "queue:patient_called",
  PATIENT_NEXT: "queue:patient_next",
  QUEUE_PAUSED: "queue:paused",
  QUEUE_RESUMED: "queue:resumed",
  JOIN_ROOM: "room:join",
} as const;

export const SocketRooms = {
  DISPLAY: "display",
  DOCTOR: "doctor",
} as const;
