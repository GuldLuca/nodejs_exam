const router = require("express").Router();

// get request on /secretentrance - server index.html file
router.get("/secretentrance", (req, res) => {
    res.sendFile("/home/luca/nodejs_reeksamen/views/html/index.html");
});

module.exports = router;