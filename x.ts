// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/') {
//     // Serve an HTTP response
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('This is an HTTP server. Upgrade to WebSocket for real-time communication!');
//   } else {
//     res.writeHead(404);
//     res.end('Not Found');
//   }
// });

// server.on('upgrade', (req, socket, head) => {
//   const key = req.headers['sec-websocket-key'];

//   // Validate if the WebSocket key exists
//   if (!key) {
//     socket.destroy();
//     return;
//   }

//   // Generate Sec-WebSocket-Accept
//   const acceptKey = generateWebSocketAcceptKey(key);

//   // Respond with the WebSocket handshake
//   const responseHeaders = [
//     'HTTP/1.1 101 Switching Protocols',
//     'Upgrade: websocket',
//     'Connection: Upgrade',
//     `Sec-WebSocket-Accept: ${acceptKey}`
//   ];
//   socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');

//   // WebSocket connection established
//   console.log('WebSocket connection established!');

//   // Handle incoming WebSocket messages
//   socket.on('data', (buffer) => {
//     const message = parseWebSocketMessage(buffer);
//     console.log('Received message from client:', message);

//     // Echo the message back to the client
//     const response = formatWebSocketMessage(`You said: ${message}`);
//     socket.write(response);
//   });

//   socket.on('close', () => {
//     console.log('WebSocket connection closed');
//   });
// });

// // Generate the Sec-WebSocket-Accept header value
// function generateWebSocketAcceptKey(key) {
//   const crypto = require('crypto');
//   const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
//   return crypto.createHash('sha1').update(key + GUID).digest('base64');
// }

// // Parse WebSocket messages
// function parseWebSocketMessage(buffer) {
//   const secondByte = buffer[1];
//   const length = secondByte & 127;
//   let maskStart = 2;

//   if (length === 126) maskStart = 4;
//   else if (length === 127) maskStart = 10;

//   const dataStart = maskStart + 4; // 4 bytes for masking key
//   const mask = buffer.slice(maskStart, maskStart + 4);
//   const data = buffer.slice(dataStart);

//   // Decode the WebSocket data
//   let decoded = '';
//   for (let i = 0; i < data.length; i++) {
//     decoded += String.fromCharCode(data[i] ^ mask[i % 4]);
//   }
//   return decoded;
// }

// // Format WebSocket messages to send to the client
// function formatWebSocketMessage(message) {
//   const messageBuffer = Buffer.from(message);
//   const length = messageBuffer.length;
//   let header;

//   if (length < 126) {
//     header = Buffer.alloc(2);
//     header[0] = 0x81; // FIN and text frame opcode
//     header[1] = length;
//   } else if (length < 65536) {
//     header = Buffer.alloc(4);
//     header[0] = 0x81; // FIN and text frame opcode
//     header[1] = 126;
//     header.writeUInt16BE(length, 2);
//   } else {
//     header = Buffer.alloc(10);
//     header[0] = 0x81; // FIN and text frame opcode
//     header[1] = 127;
//     header.writeBigUInt64BE(BigInt(length), 2);
//   }

//   return Buffer.concat([header, messageBuffer]);
// }

// // Start the server
// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Filter = "all" | "completed" | "incomplete";

interface TaskStore {
  tasks: Task[];
  filter: Filter;
  filteredTasks: () => Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskStore>()(persist((set, get) => ({
  tasks: [],
  filter: "all",

  filteredTasks: () => {
    const { tasks, filter } = get();
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  },

  addTask: (title) => {
    set((state) => ({
      tasks: [
        ...state.tasks, { id: crypto.randomUUID(), title: title, completed: false }
      ]
    }))
  },

  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }))
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  },

  setFilter: (filter) => {
    set(() => ({ filter }));
  },

  clearCompleted: () => {
    set((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    }));
  },
}),
  {
    name: "task-store",
    partialize: (state) => ({ tasks: state.tasks, filter: state.filter }),
  }
)
);
