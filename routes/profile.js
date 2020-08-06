const router = require("express").Router();
const Profile = require("../models/profile");
const User = require("../models/user");

// get request 
router.get("/api/profile/:username", (req, res) => {

    const username = req.params.username;
    
    User.findOne({where: {username: username}})
    .then((userResult) => {
        let id = ""
        if (userResult){
            id = userResult.id;
        }
        else{
            console.log("Username dosen't match any id in db");
        }        

       Profile.findOne({where: {"userId": id}})
        .then((profileResult) => {

            if(profileResult){
                console.log(profile);
                return res.send({ response: profileResult });
            } 
            else{
                return res.send({response: {}});
            }
        })

    })
})

// put request
router.put("/update-profile", (req, res) =>{

    const {firstname, lastname, phone, address, profileId} = req.body;

    if (profileId) {
        Profile.findOne({where: {"id" : profileId}})
        .then((profile) => {
            if(profile){
                profile.update(
                    {firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    address: address}
                )
            }
            else{
                Profile.create({
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    address: address
                });
            }
        });
    } else {
        Profile.create({
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            address: address
        });
    }
})

module.exports = router;
