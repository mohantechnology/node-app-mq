require('dotenv').config();
const app = require('./config/app');
// const constant = require('./Utils/constant.js');
require('./config/database').connectToDatabase();
 
const port = process.env.PORT || 9000;

app.all('/*', (req, res) => {
  res.status(404).send({ status: 'error', message: 'page not found' });
});

app.listen(port, () => {
  //  eslint-disable-next-line no-console
  console.log(`listening at ${port}`);
});
