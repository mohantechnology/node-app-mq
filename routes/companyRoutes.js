const express = require('express');
const userRoutes = express.Router();
 
const companyController = require('../controllers/companyController.js');

userRoutes.get("/search_company",  companyController.searchCompany);
userRoutes.post("/company",  companyController.addCompany); // create company 

module.exports = userRoutes;