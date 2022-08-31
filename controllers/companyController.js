// const path = require('path');
const catchError = require('../middlewares/catchError');
const AppError = require("../utils/AppError");
const fetch = require('cross-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* import models */
const Company = require('../model/Company');

const fetchCompanyData =   (query) => { 
  /* eslint-disable no-async-promise-executor */
  return new Promise(async(resolve, reject) => {
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
        throw new AppError("Bad response from server" ,500);
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
      reject( err );
    }
  }
  );
};

module.exports.searchCompany =  catchError(async (req, res) => {

  req.query.query = req.query.query ? req.query.query.trim() : undefined;

  if (!req.query.query) {
    throw new AppError("Must have some character to search", 400);
  }

  const companyList = await fetchCompanyData(req.query.query);

  res.json(companyList);

});


module.exports.addCompany = catchError(async (req, res) => {
 
  // if (!req.body.password || !req.body.conformPassword) {
  //   throw new AppError("Must have field 'password', 'conformPassword' ", 400);
  // }
  // if (req.body.password !== req.body.conformPassword) {
  //   throw new AppError("Password not Matched ", 400);
  // }
  req.body.title =   req.body.title ?  req.body.title.trim(): null ; 
  req.body.cId =   req.body.cId ?  req.body.cId.trim(): null ; 

   console.log( "req.body ***88" ) ; 
   console.log( req.body ) ; 

    let result =  await  Company.create(req.body)
    console.log( "result" )
    console.log( result )
  return res.status(201).json(result) ; 



});