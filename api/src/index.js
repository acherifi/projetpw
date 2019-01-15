const express=require('express');
const bodyParser = require('body-parser');
const MongoClient=require('mongodb').MongoClient;
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const MONGO_URL = process.argv[2] === undefined ? 'mongodb://root:cinewebpw1@ds061839.mlab.com:61839/cineweb': process.argv[2];
const DATA_BASE = 'cineweb';

(async () => {
  try {
    const mongoClient = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    module.exports.database = await mongoClient.db(DATA_BASE);
  } catch (e) {
    console.error(e);
  }
})();


const app = express();
app.listen(process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());
app.use('/users', require('./users'));
app.use('/watchlist', require('./watchlist'));
app.use('/movies', require('./movies'));