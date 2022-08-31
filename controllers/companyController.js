const path = require('path');
const catchError = require('../middlewares/catchError');
const AppError = require("../utils/AppError");
const fetch = require('cross-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

/* import models */


const fetchCompanyData =   (query) => {
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
        console.log( response)
        throw new AppError("Bad response from server" ,500);
      }
      const responseText = await response.text();

      // extract data from html string 
      const dom = new JSDOM(responseText);
      const companyElementList = dom.window.document.getElementsByTagName("div");
      let companyList = []

      for (i = 0; i < companyElementList.length; i++) {

        companyList.push({
          companyTitle: companyElementList[i].textContent,
          companyId: companyElementList[i].id.split("/").pop(),
        })
      }


      resolve(companyList);
    } catch (err) {
      // console.error(err);
      reject( err )
    }
  }
  )
}

module.exports.searchCompany =  catchError(async (req, res) => {

  req.query.query = req.query.query ? req.query.query.trim() : undefined;

  if (!req.query.query) {
    throw new AppError("Must have some character to search", 400);
  }


  const companyList = await fetchCompanyData(req.query.query)

  res.json(companyList)
});

