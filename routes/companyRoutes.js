const express = require('express');
const companyRoutes = express.Router();
 
const companyController = require('../controllers/companyController.js');

companyRoutes.get("/",  companyController.home);

// search routes 
companyRoutes.get("/search_company",  companyController.searchCompany);

// company routes 

companyRoutes.get("/company",  companyController.listAllCompany); // list   company 
companyRoutes.post("/company",  companyController.addCompany); // create company 
companyRoutes.delete("/company",  companyController.removeCompany); // delete  company 

module.exports = companyRoutes;