// require('dotenv').config();

const { sleep } = require('../utils/utilFunc');
const Sequelize = require('sequelize');
const DB_LINK = process.env.DB_LINK;
const options = {
  //   host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
};
var sequelize =  new Sequelize(DB_LINK, options);;

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.info('Connection to database sucessful');
  } catch (err) {
    console.error("Failed to Connect with database");
    // console.error(err); 
    await sleep(3000);
    await connectToDatabase();
  }
}




// If the Node process ends, close the  connection 

// async function closeConnection(){
//   if( sequelize){
//     sequelize.close()
//     console.info ("Connection Closed !!"); 
//     process.exit(0);
//   }

// }

// [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
//   process.on(eventType,closeConnection);
// })

module.exports = { connectToDatabase, sequelize };
