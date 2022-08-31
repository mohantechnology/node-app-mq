
const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('company', {
    title: {

        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Must have value for title'
              }    ,
     
        }
    },
    cId: {
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Already have Company with given cId'
        },
        allowNull: false,
    
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Must have value for cId'
              },
         

        }
    },

});

Company.sync().then(() => {
    //   console.log('table created');
});
module.exports = Company;