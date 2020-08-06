function updateProfile() {

    //DOM elements
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    let profileId = $("#profileId").val();

    //Update the profile
    $.ajax({
        url: "/update-profile",
        type: "PUT",
        dataType: "json",
        data: JSON.stringify({firstname, lastname, phone, address, profileId})
    })
    .done(data => {
        console.log(data);
    })

}

$(document).ready(() => {

    //On click show existing profile info from user with username
    $("#show-profile-btn").on("click", () =>{

        //Get username from url param
        const currentUsername = getUsername();

        function getUsername() {
            
            let urlSearchParams = new URLSearchParams(window.location.search);

            if(urlSearchParams.has("username")){
                return urlSearchParams.get("username");
            }
            else{
                return "";
            }
        }
        //get the profile
        $.ajax({
            url: "/api/profile/" + currentUsername,
            type: "GET",
            dataType: "json"
        })
        .done(data => {

            //Manipulate DOM to show profile info
            const profile = data.response;
                            
            $("#section-profile").append(`
                        <label for="firsname">First name:</label><br>
                        <input type="text" id="firstname" name="firstname" value="${profile.firstname}"><br>
                        <label for="lastname">Last name:</label><br>
                        <input type="text" id="lastname" name="lastname" value="${profile.lastname}">
                        <label for="phone">Phone Number:</label><br>
                        <input type="text" id="phone" name="phone" value="${profile.phone}">
                        <label for="address">Address:</label><br>
                        <input type="text" id="address" name="address" value="${profile.address}">
                        <input type= "hidden" id="profileId" name= "profileId" value="${profile.id}">
                        <button id="profile-submit-btn" onclick="updateProfile(event)">Submit</button>
                `);
                
        })
        .fail(() => {
            alert("No profile info found on user");
        });

        
    });
});