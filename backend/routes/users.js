const router = require("express").Router();
const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        // Generate new password

        // Create new user
        
        // Save user and send response
        
    } catch (error) {
        res.status(500).json(error);
    }
})

// Login to an existing user
router.get("/", async(req, res)=>{
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router