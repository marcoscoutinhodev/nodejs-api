const UserModel = require("../../Model/User");

module.exports = async (req, res, next) => {
    const errors = {};
    const {
        name,
        email,
        password
    } = req.body;

    if(!name) 
        errors.name = "Name is required";
    
    if(!email) 
        errors.email = "Email is required";

    if(!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))
        errors.email = "Invalid email format";
    
    if(!password) 
        errors.password = "Password is required";

    if(Object.keys(errors).length > 0)
        return res.status(422).json(errors);

    const user = await UserModel.findOne({
        where: { email },
    });

    if(user)
        return res.status(400).json({ error: "Email already is registered" });

    next();
};