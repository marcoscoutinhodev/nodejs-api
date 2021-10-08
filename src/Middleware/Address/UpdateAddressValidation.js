module.exports = (req, res, next) => {
    const {
        zipcode,
        street,
        number,
    } = req.body;
    const errors = {};

    if(!zipcode)
        errors.zipcode = "Zipcode is required";

    if(!street)
        errors.street = "Street is required";

    if(!number)
        errors.number = "Number is required";

    if(Object.keys(errors).length > 0)
        return res.status(400).json(errors);

    next();
}