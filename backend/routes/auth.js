const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//Secret String can be anything.
const JWT_SECRET = 'MyNameIsSAM'

//ROUTE 1 : Create a User : Post "/api/auth/createuser". Doesn't require Authentication
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
        //check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry user already exist with this email Id" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
        // res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//ROUTE 2: Authenticate a User : Post "/api/auth/login". Doesn't require Authentication
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be blank').notEmpty(),
], async (req, res) => {
    //if there are errors, return bad request with error message

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    // Destructuring email and password from req.body
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "Invalid User and Password!" });
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ error: "Invalid User and Password!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//ROUTE 3 : Get Loggedin User Details using authtoken and middleware(fetchuser): Post "/api/auth/getuser". Require Authentication
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId);
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})
module.exports = router;