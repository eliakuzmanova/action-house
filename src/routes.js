const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const actionController = require("../controllers/actionController")
const {isAuth} = require("../middlewares/authMiddleware")

//add middleware to the needed routes <<<<-----------------------

router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/publish", isAuth, actionController.getCreateView)
router.post("/publish", isAuth, actionController.postCreate)

router.get("/browse", actionController.getBrowseView)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

module.exports = router