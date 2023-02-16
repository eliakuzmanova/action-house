const Action = require("../models/Action");

exports.create = (title, category, imageUrl, price, description, userId) => Action.create({title,description, category, imageUrl, price, author: userId});

exports.getALL = () => Action.find({}).lean();