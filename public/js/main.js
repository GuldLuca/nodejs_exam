$(document).ready(function() {

    const socket = io();
    var messageWindow = document.getElementById("message-list");
    var messageToSend = document.getElementById("send-message-input");
    var usersWindow = document.getElementById("users-connected-list");
    var typeField = document.getElementById("section-typing");
    
    $.ajax({
        contentType: "application/json"
    });

    //Send new username
    $("#username-button").click(function() {
        let li = document.createElement("li");
        usersWindow.appendChild(li).append($("#username-input").val());
    });

    //Load previous messages
    $("#previous-message-btn").click(function () {
        $.ajax({
            type: "GET",
            url: "loadUsers.php",
            dataType: "html",
            success: function(response){
                $("#previous-message-table").html(response);
            }
        });
    });

    //Load new messages to list
    socket.on("new_message", (data) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        messageWindow.appendChild(span).append($("#username-input").val());
        messageWindow.appendChild(li).append(data.message);
        

    });

    //Send new message
    $("#send-message-btn").click(function() {
        socket.emit("new_message", {message: $(messageToSend).val()});
    });

    /*messageToSend.on("keypress", e => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode != "13"){
            socket.emit("typing");
        }
    });*/

    // On register show that user is typing
    socket.on("typing", (data) => {
        typeField.html("<p><i>" + data.username + " is typing a message..." + "</i></p><hr>")
    });
});
