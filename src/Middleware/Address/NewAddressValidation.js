const AddressModel = require("../../Model/Address");

module.exports = async (req, res, next) => {
    const errors = {};
    const {
        zipcode,
        street,
        number
    } = req.body;
    const userId = req.userId;

    if(!zipcode)
        errors.zipcode = "Zipcode is required";
    
    if(!street)
        errors.street = "Street is required";
    
    if(!number)
        errors.number = "Number is required";

    if(Object.keys(errors).length > 0)
        return res.status(400).json(errors);

    const address = await AddressModel.findOne({
        where: { user_id: userId },
    });

    if(address)
        return res.status(400).json({ error: "The user already has a registered address" });

    next();
}