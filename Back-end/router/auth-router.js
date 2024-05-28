const express = require("express");
const router = express.Router();
const authContollers = require("../controller/auth-controller");

const {signup_schema, login_schema} = require("../validator/auth-validator");

const val_middleware = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware")


router.route("/").get(authContollers.home);

// before registration we need to check that data entered is compatible with signup_schema or not and same for login.
router.route("/register").post(val_middleware(signup_schema), authContollers.register);
router.route("/login").post(val_middleware(login_schema), authContollers.login);
router.route('/user').get(authMiddleware, authContollers.user);
router.route('/userList').get( authMiddleware, authContollers.userList);
router.route('/user/add').post( authMiddleware, val_middleware(signup_schema),  authContollers.addUser);
router.route('/user/delete/:id').delete( authMiddleware, authContollers.deleteUser);
router.route('/user/update/:id').patch( authMiddleware, val_middleware(signup_schema), authContollers.updateUser);


module.exports = router;