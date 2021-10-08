const jwt = require("jsonwebtoken");
const jwtAuth = require("../Config/jwtAuth.json");
const bcrypt = require("bcrypt");

const UserModel = require("../Model/User");

class UserController {
    async signup(req, res) {
        const {
            name,
            email,
            password
        } = req.body;
    
        try {
            const user = await UserModel.create({
                name,
                email,
                password,
            });

            if(!user)
                return res.status(400).json({ error: "Error to create user" });
    
            user.password = null;

            return res
                .status(200)
                .json({ user, token: generateToken({ id: user.id })});
        } catch(err) {
            return res
                .status(500)
                .json(err.message);
        }
    }

    async signin(req, res) {
        try {
            const {
                email,
                password,
            } = req.body;
    
            const user = await UserModel.findOne({
                where: { email }
            });
    
            if(!user)
                return res.status(400).json({ error: "User not found" });
    
            const isValidPassword = await bcrypt.compare(password, user.password);
    
            if(!isValidPassword)
                return res.status(400).json({ error: "Invalid password" });
    
            user.password = null;
    
            return res
                .status(200)
                .json({ user, token: generateToken({ id: user.id }) });
        } catch(err) {
            return res
                .status(500)
                .json(err.message);
        }
    }
}

function generateToken(params = {}) {
    return jwt.sign(params, jwtAuth.secret, {
        expiresIn: 86400,
    });
}

module.exports = new UserController();