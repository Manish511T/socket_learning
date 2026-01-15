import express from "express";
import { Server } from "socket.io";
import http from "http"
import cors from "cors"

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Hello World");
})

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("message", (data)=>{
        console.log(data);
    })
})

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})