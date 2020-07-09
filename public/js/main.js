$(document).ready(function() {

    const socket = io();
    var messageWindow = document.getElementById("message-list");
    var messageToSend = document.getElementById("send-message-input");
    var usernameSend = document.getElementById("username-input");
    var usersWindow = document.getElementById("users-connected-list");
    var passwordSend = document.getElementById("password-input");
    
    $.ajax({
        contentType: "application/json"
    });

    //Send new username
    $("#username-button").on("click", () => {
        socket.emit("user_connected", {
            username: $(usernameSend).val(),
            password: $(passwordSend).val()
        });
    });

    socket.on("user_connected", () => {
        let li = document.createElement("li");
        usersWindow.appendChild(li).append($("#username-input").val());
        window.getUsers();
    });

    //Load new messages to list
    socket.on("new_message", (data) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        messageWindow.appendChild(span).append($("#username-input").val());
        messageWindow.appendChild(li).append(data.message);
    });

    //Send new message
    $("#send-message-btn").click(() =>{
        socket.emit("new_message", {message: $(messageToSend).val()});
    });
});
