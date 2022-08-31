// const path = require('path');
const catchError = require('../middlewares/catchError');
const AppError = require("../utils/AppError");
const fetch = require('cross-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* import models */
const Company = require('../model/Company');

/*  fetch company detail from target url    */
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

/*  search company     */
module.exports.searchCompany = catchError(async (req, res) => {

  req.query.query = req.query.query ? req.query.query.trim() : undefined;

  if (!req.query.query) {
    throw new AppError("Must have some character to search", 400);
  }

  const companyList = await fetchCompanyData(req.query.query);

  return res.status(200).json({
    message: "Search List are",
    data: companyList
  });

});

/*  created company with given detail   */
module.exports.addCompany = catchError(async (req, res) => {

  req.body.title = req.body.title ? req.body.title.trim() : null;
  req.body.cId = req.body.cId ? req.body.cId.trim() : null;

  if (!req.body.title || !req.body.cId) {
    throw new AppError("Must have field 'title', 'cId' ", 400);
  }

  let result = await Company.create({
    title: req.body.title,
    cId: req.body.cId
  });

  return res.status(201).json({
    message: "Successfully added Company",
    data: result
  });

});

/*  list all  Company  */
module.exports.listAllCompany = catchError(async (req, res) => {

  let result = await Company.findAll();

  return res.status(200).json({
    message: "Company List are",
    data: result
  });

});

/*  remove company with given id   */
module.exports.removeCompany = catchError(async (req, res) => {
 
  if (!req.body.id) {
    throw new AppError("Must have field 'id' ", 400);
  }

  // delete company 
  let result = await Company.destroy({
    where: {
      id: req.body.id
    }
  });

  if (result) {
    return res.status(200).json({
      message: "Successfully deleted  Company",

      // if companyList == yes then include all company list in  response 
      data: req.body.companyList == "yes" ? await Company.findAll() : undefined
    });
  } else {
    return res.status(404).json({
      message: "Company Not Exist",
    });
  }

});


 
module.exports.home = catchError(async (req, res) => {

 
  return res.status(200).json({
    message: "Api is Running Successfully"
  });

});