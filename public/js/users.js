$(document).ready(() => {
    window.getUsers = () => {

        $.ajax({
            url: "/api/users",
            type: "GET",
            dataType: "json"
        })
        .done(data => {
            let users = data.response;
            let usersLength = users.length;

            $("#previous-users-list")[0].innerHTML = "";

            for(let i = 0; i < usersLength; i++) {
                const li = document.createElement("li");

                li.innerHTML = users[i].username;
                $(li).attr("data-id", users[i].id);
                $(li).addClass("user-list-element");

                $("#previous-users-list").append(li);
            };

            $(".user-list-element").on("click", (event) => {
                
                const id = $(event.currentTarget).attr("data-id");

                $.ajax({
                    url: "/api/users/" + id,
                    type: "GET",
                    data: {id: id}
                })
                .done(data => {
                    let userInfo = data.response;

                    for (let i = 0; i < userInfo.length; i++){
                        
                        let detail = userInfo[i];
                        
                        $("#section-user-details").append(`
                            <table>
                                <tr>
                                    <th>Username</th>
                                    <th>Member since</th>
                                </tr>
                                <tr>
                                    <th>${detail.username}</th>
                                    <th>${detail.createdAt}</th>
                                </tr>
                            </table>
                        `);
                    }
                    
                });
            });
        })
    }
    window.getUsers();
})