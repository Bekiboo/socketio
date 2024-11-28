# Overview

This is a simple WebSocket demo where users can connect to the app and see the cursor of other users in real-time. The app is built using React.js and Socket.IO.

To install the app, use the following command:

```bash
pnpm install
```

For the client side, use the following command to start the app:

```bash
pnpm run dev
```

For the server side, use the following command to start the server:

```bash
pnpm run start
```

[Demo Video](https://youtu.be/AuZu1HfiTfs)

# Network Communication

The architecture is client-server, with a Node.js server using Socket.IO to manage real-time WebSocket connections on port 3000. Clients, such as a web app hosted at http://localhost:5173, communicate with the server for state updates and broadcasts.

The communication operates over TCP via WebSockets, ensuring reliable and ordered data transfer. JSON is used for message formatting, making exchanges easy to parse and compatible across platforms.

Messages include user updates with IDs and colors, mouse movements with coordinates and IDs, and disconnection notices containing the user ID. This structured approach enables clear and efficient communication.

# Development Environment

I used Visual Studio Code to develop this app. The app is built using React.js and Socket.IO.
React.js is a JavaScript library for building user interfaces.
Socket.IO is a library that enables real-time, bidirectional, and event-based communication between web clients and servers.

# Useful Websites

- [Socket.IO](https://socket.io/)
- [React.js](https://reactjs.org/)

# Future Work

- Add a chat feature
- Add a feature to draw on the screen
