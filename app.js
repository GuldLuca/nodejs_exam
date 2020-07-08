const express = require("express");
const app = express();
const sequelize = require("sequelize");
const http = require("http").Server(app);
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const path = require("path");
const phpExpress = require("php-express")({
    binPath: "php"
});
const router = express.Router;

const io = require("socket.io")(http);

//get request on index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/html/index.html");
});

//Socket.io connection on socket
io.on("connection", (socket) => {

    //User connected
    socket.on("user_connected", data => {
        socket.emit("user_connected", data);

        User.create({
            username: socket.username
        });

    });

    //Typing
    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", {
            username: data.username
        });
    });

    //New message
    socket.on("new_message", (data) => {
        socket.emit("new_message", {message: data.message, username: socket.username});

        Message.create({
            from: socket.username,
            message: data.message
        })
    });

    socket.on("disconnection", data => {
        socket.emit("disconnection", {username: socket.username})
        console.log("Disconnection from : ", data);
    });

});

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "/views/html"));
app.engine("php", phpExpress.engine);

//Routes
const userRoute = require("./routes/users");
app.use(userRoute);


//Connect to database
const DB = require("./models/database");
const User = require("./models/user");
const Message = require("./models/message");

//Database associations
User.hasMany(Message);
Message.belongsTo(User);

//Sequelize sync
sequelize
DB.sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        return user;
    })
    .catch(err => console.log(err));


//Listen on port
http.listen(port, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Server running on port: ", port);
});
