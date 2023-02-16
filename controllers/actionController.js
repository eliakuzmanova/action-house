const actionService = require("../services/actionService");
const errorUtils = require("../utils/errorUtils");

exports.getCreateView = (req, res)=> {

        try {
            res.render("action/create")
        } catch (err) {
            return errorUtils.errorResponse(res, "home/404", err, 404);
        }
}

exports.postCreate = async (req, res)=> {
    try {
        const {title, category, imageUrl, price, description} = req.body;
        const userId = req.user.userId

        await actionService.create(title, category, imageUrl, price, description, userId)

        res.redirect("/browse")
    } catch (err) {
        return errorUtils.errorResponse(res, "action/create", err, 404);
    }
};

exports.getBrowseView = async (req, res) => {
    try {
      const actions = await actionService.getALL()
        res.render("action/browse", {actions})
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
};