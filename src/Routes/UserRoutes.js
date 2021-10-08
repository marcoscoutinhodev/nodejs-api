const { Router } = require("express");

const UserController = require("../Controller/UserController");
const AddressController = require("../Controller/AddressController");

const SignUpValidation = require("../Middleware/User/SignUpValidation");
const SignInValidation = require("../Middleware/User/SignInValidation");
const AuthValidation = require("../Middleware/User/AuthValidation");
const NewAddressValidation = require("../Middleware/Address/NewAddressValidation");
const UpdateAddressValidation = require("../Middleware/Address/UpdateAddressValidation");

const router = Router();

router.post("/signup", SignUpValidation, UserController.signup);
router.post("/signin", SignInValidation, UserController.signin);
router.post("/address/new", AuthValidation, NewAddressValidation, AddressController.newAddress);
router.get("/address/registered", AuthValidation, AddressController.addressRegistered);
router.post("/address/update", AuthValidation, UpdateAddressValidation, AddressController.addressUpdate);

module.exports = router;