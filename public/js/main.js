$(document).ready(function() {

    //Get socket instance
    const socket = io();

    //Elements from DOM
    var messageWindow = document.getElementById("message-list");
    var messageToSend = document.getElementById("send-message-input");
    var usersWindow = document.getElementById("users-connected-list");
    
    //Current username solution
    var currentUserName = "";
    getUserName();

    //Get username from query params / url
    function getUserName(){
        let urlSearchParams = new URLSearchParams(window.location.search);
        if (urlSearchParams.has("username")) {
            currentUserName = urlSearchParams.get("username");
        }
        else{
            console.log("no username found");
        }
    }

    //Emit to server that user (username) was added
    socket.emit("add_user", {username: currentUserName});

    //Change DOM to show new users - listen for events from server
    socket.on("user_connected", (data) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let br = document.createElement("br");
        usersWindow.appendChild(li).append(data.username);
        window.getUsers();
        messageWindow.appendChild(span).append(data.username + " connected to chatroom");
        messageWindow.append(br);
    });

    //Change DOM to show that users left chatroom - when user_disconnected in server
    socket.on("user_disconnected", (data) => {
        let span = document.createElement("span");
        let br = document.createElement("br");
        messageWindow.appendChild(span).append(data.username + " disconnected from chatroom");
        messageWindow.append(br);
    })

    //Append new messages to list in DOM when new_message
    socket.on("new_message", (data) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        let br = document.createElement("br");
        messageWindow.appendChild(span).append(data.username);
        messageWindow.appendChild(li).append(data.message);
        messageWindow.append(br);
    });

    //Send new message to server on click with message and username
    $("#send-message-btn").click(() =>{
        socket.emit("new_message_send", {message: $(messageToSend).val(), username: currentUserName});
    });
    
});
