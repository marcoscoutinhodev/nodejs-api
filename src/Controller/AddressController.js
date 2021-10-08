const AddressModel = require("../Model/Address");

class Address {
    async newAddress(req, res) {
        const userId = req.userId;
        const {
            zipcode,
            street,
            number
        } = req.body;

        try {
            const address = await AddressModel.create({
                user_id: userId,
                zipcode,
                street,
                number
            });
            
            if(!address)
                return res.status(400).json({ error: "Error registering address" });
            
            return res
                .status(200)
                .json(address);
        } catch(err) {
            return res
                .status(500)
                .json(err.message);
        }
    }

    async addressRegistered(req, res) {
        const userId = req.userId;
        
        try {
            const address = await AddressModel.findOne({
                where: { user_id: userId },
            });
    
            if(!address)
                return res.status(200).json({ info: "User doesn't have registered address" });
            
            return res
                .status(200)
                .json(address);
        } catch(err) {
            return res
                .status(500)
                .json(err.message);
        }
    }

    async addressUpdate(req, res) {
        const userId = req.userId;
        const {
            zipcode,
            street,
            number
        } = req.body;

        try {
            const address = await AddressModel.update({
                zipcode,
                street,
                number,
            }, {
                where: { user_id: userId },
            });

            const [ rowsAffected ] = address;

            if(!rowsAffected)
                return res.status(400).json({ error: "Error to update address" });

            return res
                .status(200)
                .json({ log: "User address has been updated successfully" });
        } catch(err) {
            return res
                .status(500)
                .json(err.message);
        }
    }
}

module.exports = new Address();