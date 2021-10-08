module.exports = (req, res, next) => {
    const errors = {};
    const {
        email,
        password
    } = req.body;

    if(!email)
        errors.email = "Email is required";

    if(!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))
        errors.email = "Invalid email format";

    if(!password)
        errors.password = "Password is required";

    if(Object.keys(errors).length > 0)
        return res.status(422).json(errors);

    next();
}