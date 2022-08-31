const path = require('path');
const catchError = require('../middlewares/catchError');
const AppError = require("../utils/AppError");
 
/* import models */
 
module.exports.searchCompany = (req, res) => {
  res.send("inside controller")
};

 