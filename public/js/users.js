const User = require("../../models/user");

$(document).ready(function() {
    $.ajax({
        url: "./routes/users" + user,
        type: "GET"
    })
    .done(data => {
        const userInfo = data.response;

    })
    .fail(() => {
        alert("Username dosen't exist");
    });

    
})