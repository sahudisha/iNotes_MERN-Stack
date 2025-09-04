var jwt = require('jsonwebtoken');
const JWT_SECRET = 'MyNameIsSAM'

const fetchuser = (req, res, next) => {
    
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid user' })
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
}
module.exports = fetchuser;