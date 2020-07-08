const router = require("express").Router();
const User = require("../models/user");

//Get specific user from register
router.get('/data/getuser/:username', async (req, res) => {
    const username = req.params.username;
    const user = await User.findAll({where: {"username": username}});
    //query().select('users.id').where({ 'username': username });
    if (user.length > 0) {
        return res.send({ response: user });
    } else {
        return res.status(400).send({ response: "Username dosen't exists" });
    }
});

module.exports = router;