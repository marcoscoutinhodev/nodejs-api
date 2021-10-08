const jwt = require("jsonwebtoken");
const jwtAuth = require("../../Config/jwtAuth.json");
const UserModel = require("../../Model/User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization)
        return res.status(400).json({ error: "Token not found" });

    const tokenInfo = authorization.split(' ');

    if(tokenInfo.length !== 2)
        return res.status(400).json({ error: "Invalid token" });

    const [ schema, token ] = tokenInfo;

    if(!/^Bearer$/.test(schema))
        return res.status(400).json({ error: "Token malformatted" });
    
    jwt.verify(token, jwtAuth.secret, async (err, decode) => {
        if(err) 
            return res.status(401).json({ error: "User cannot be validated" });

        req.userId = decode.id;
        
        const user = await UserModel.findByPk(req.userId);

        if(!user) {
            return res.status(201).json({ error: "User has been changed or deleted, try to validate again" });
        }

        next();
    });
};