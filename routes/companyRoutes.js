const express = require('express');
const userRoutes = express.Router();
 
const companyController = require('../controllers/companyController.js');

// search routes 
userRoutes.get("/search_company",  companyController.searchCompany);

// company routes 
userRoutes.get("/company",  companyController.listAllCompany); // list   company 
userRoutes.post("/company",  companyController.addCompany); // create company 
userRoutes.delete("/company",  companyController.removeCompany); // delete  company 


module.exports = userRoutes;