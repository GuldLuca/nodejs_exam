const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const io = require("socket.io")(http);

const port = 4000;

//Workaround directory comlextion with routes when both hosting and local
global.appRoot = __dirname;


//Setup bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Static folder specified
app.use(express.static(path.join(__dirname + "/public/")));

//Views folder with html specification
app.set("views", path.join(__dirname + "views/html"));


//Setup session
app.use(session({
    secret: "duckduckduck",
    resave: false,
    saveUninitialized: true
}));

//Session find session user object
app.use((req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user._id).then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));
});

//Routes
const userRoute = require("./routes/users");
app.use(userRoute);

const authRoute = require("./routes/auth");
app.use(authRoute);

const chatroomRouter = require("./routes/chatroom");
app.use(chatroomRouter);

const profileRouter = require("./routes/profile");
app.use(profileRouter);


//Socket.io connection between server and clients - the socket
const userList = {};

io.on("connection", (socket) => {

    //User connected
    socket.on("add_user", data => {

        userList[socket.id] = data.username;

        //Emit to alle clients except sender
        socket.broadcast.emit("user_connected", {
            username: data.username,
            password: data.password,
        });

        //Maybe change to userList[socket.id] down below
        const user = data.username;

        User.findOne({where: {username: user}}).then(user => {
            if(user){
                console.log("User found in db.");
            }
            else{
                console.log("Creating new user in db");

                User.create({
                    username: data.username,
                    password: data.password
                });
            }
        });
    });

    //User disconnected
    socket.on("disconnect", () => {

        //Emit to all clients except sender
        socket.broadcast.emit("user_disconnected", {username: userList[socket.id]});
        delete userList[socket.id];
    });

    //New message
    socket.on("new_message_send", (data) => {

        //Emit to all connected clients
        io.emit("new_message", {
            message: data.message,
            username: userList[socket.id]
        });

        //Create message in DB for every new_message_send
        Message.create({
            from: userList[socket.id],
            message: data.message
        })
    });
});


//Database Models
const DB = require("./models/database");
const User = require("./models/user");
const Message = require("./models/message");
const Profile = require("./models/profile");

//Database associations
User.hasMany(Message);
User.hasOne(Profile);
Message.belongsTo(User);
Profile.belongsTo(User);

//Sequelize sync database
DB.sync();


//Listen on port
http.listen(port, (error) => {
    if(error){
        console.log(error);
    }
    console.log("Server running on port: ", port);
});