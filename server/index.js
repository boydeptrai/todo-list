const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http").Server(app)

const PORT = 4000;

const socketIO = require('socket.io')(http, {
    cors: {
        origin:  "http://localhost:3000"
    }
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
            socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

app.get("/api", (req,res) => {
    res.json({
        message: "Hello World",
    });
});



http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});