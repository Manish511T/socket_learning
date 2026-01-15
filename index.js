import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server); 

// Socket.io
io.on("connection", (socket)=>{
    socket.on("user-message", (message)=>{
        io.emit("message", message)
    })
})


app.use(express.static(path.resolve("public")));

server.listen(5000, () => {
  console.log("Server running at PORT: 5000");
});
