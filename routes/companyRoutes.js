const express = require('express');
const userRoutes = express.Router();
 
const companyController = require('../controllers/companyController.js');

userRoutes.get("/search_company",  companyController.searchCompany);
// userRoutes.get("/add_company",  companyController.addCompany);

module.exports = userRoutes;