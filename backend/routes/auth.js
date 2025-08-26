const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

//Create a User : Post "/api/auth/createuser". Doesn't require Authentication
router.post('/createuser', [
    body('name', 'Enter a name with minimum 3 characters.').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with minimum 3 characters.').isLength({ min: 3 }),
], async (req, res) => {

    //if there are errors, return bad request with error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry user already exist with this email Id" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred!")
    }
})

module.exports = router;