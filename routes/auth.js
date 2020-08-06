const router = require("express").Router();
const url = require("url");

const bcrypt = require("bcrypt");
const User = require("../models/user");

const saltRounds = 12;


// post request on /login
router.post("/login", (req, res) =>{
    const {username, password} = req.body;

    if(username && password){

        try{
            User.findOne({ where: {username: username}})
            .then (user => {
                if(!user){
                    return res.status(400).send({ response: "Couldn't find any user with that username" });
                }
                bcrypt.compare(password, user.password).then(result => {
                    if (result){
                        req.session.user = user;
                        return res.redirect(url.format({ pathname: "/secretentrance", query: { username: user.username }}));
                
                    }
                    return res.status(500).send({ response: "An error occured in the database" });
                })
            .catch(error => console.log(error));
            })
        }
        catch(error){
            console.log(error);
        }

    }
    else{
        return res.status(400).send({ response: "Please enter both username and password" });
    }
});

router.get("/login", (req, res) => {
    res.sendFile("/home/luca/nodejs_reeksamen/views/html/register.html");
})

router.get("/signup", (req, res) => {
    res.sendFile("/home/luca/nodejs_reeksamen/views/html/register.html");
})

// post request on /signup
router.post("/signup", (req, res) => {
    const {username, password} = req.body;

    if (username, password){
        if (password.length < 5){
            return res.status(400).send({ response: "You are lazy. Password should be longer than 5 characters, mate." });
        }
        else{
            try{
                User.findOne({where: {username: username}})
                .then(user => {
                    if(user){
                        return res.status(400).send({ response: "Username taken by someone else" });
                    }
                    else{
                        bcrypt
                        .hash(password, saltRounds)
                        .then(hashedPass => {
                            const user = new User({
                                username: username,
                                password: hashedPass
                            });
                            return user.save();
                        })
                        .then(result => {
                            console.log(result);
                            res.redirect("/login");
                        })
                        
                    }
                })
            }
            catch(error){
                return res.status(500).send({ response: "An error occurred in database." });
            }
        }
    }
    else{
        return res.status(400).send({ response: "Please enter both username and password" });
    }
});

//Signout post request, destroy session
router.post("/signout", async (req, res) => {
    req.session.destroy((error) => {
        console.log(error);
    });
    return res.redirect("/login");
});

module.exports = router;