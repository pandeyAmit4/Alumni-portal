const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

let users = [];
io.on("connection", (socket) => {
    console.log("socket:");
    console.log(socket.id);
    console.log("user connected");
    //take userid and si from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
});
