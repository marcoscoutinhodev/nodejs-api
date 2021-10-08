const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            hooks: {
                async beforeCreate(user) {
                    try {
                        const hash = await bcrypt.hash(user.password, 10);
                        return user.password = hash;
                    } catch(err) {
                        return err.message;
                    }
                }
            },
            sequelize: connection,
        });
    }
}

module.exports = User;