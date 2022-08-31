
const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('company', {
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    cId: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Company should be unique'
        },
        validate: {
            notEmpty: true,

        }
    },

});

Company.sync().then(() => {
    //   console.log('table created');
});
module.exports = Company;