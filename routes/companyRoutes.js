const express = require('express');
const userRoutes = express.Router();
 
const companyController = require('../controllers/companyController.js');

userRoutes.get("/search_company",  companyController.searchCompany);

module.exports = userRoutes;