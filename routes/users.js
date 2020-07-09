const router = require("express").Router();
const User = require("../models/user");

//Get all users from db
router.get("/api/users", async (req, res) => {

    const users = await User.findAll();

    return res.send({response: users});
});


//Get specific user from db
router.get("/api/users/:id", async (req, res) => {

    const id = req.params.id;
    const user = await User.findAll({where: {"id": id}});
    
    if(user.length > 0){
        return res.send({ response: user });
    } 
    else{
        return res.status(400).send({ response: "User dosen't exists" });
    }
});

module.exports = router;