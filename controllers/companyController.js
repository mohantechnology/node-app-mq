// const path = require('path');
const catchError = require('../middlewares/catchError');
const AppError = require("../utils/AppError");
const fetch = require('cross-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* import models */
const Company = require('../model/Company');

const fetchCompanyData = (query) => {
  /* eslint-disable no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    try {

      // fetch detail from target endpoint 
      const response = await fetch('https://www.zaubacorp.com/custom-search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: query, filter: 'company' })
      });

      if (response.status >= 400) {
        throw new AppError("Bad response from server", 500);
      }
      const responseText = await response.text();

      // extract data from html string 
      const dom = new JSDOM(responseText);
      const companyElementList = dom.window.document.getElementsByTagName("div");
      let companyList = [];

      for (let i = 0; i < companyElementList.length; i++) {

        companyList.push({
          title: companyElementList[i].textContent,
          cId: companyElementList[i].id.split("/").pop(),
        });
      }

      resolve(companyList);
    } catch (err) {
      // console.error(err);
      reject(err);
    }
  }
  );
};

module.exports.searchCompany = catchError(async (req, res) => {

  req.query.query = req.query.query ? req.query.query.trim() : undefined;

  if (!req.query.query) {
    throw new AppError("Must have some character to search", 400);
  }

  const companyList = await fetchCompanyData(req.query.query);

  res.json(companyList);

});


module.exports.addCompany = catchError(async (req, res) => {

  req.body.title = req.body.title ? req.body.title.trim() : null;
  req.body.cId = req.body.cId ? req.body.cId.trim() : null;

  if (!req.body.title || !req.body.cId) {
    throw new AppError("Must have field 'title', 'cId' ", 400);
  }

  let result = await Company.create(req.body) 
  return res.status(201).json(result);



});

module.exports.listAllCompany = catchError(async (req, res) => {
 
  let result = await Company.findAll( );
  return res.status(200).json(result);
 

});

 