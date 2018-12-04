const express=require('express');
const router = express.Router();
const MongoUsersManager = require('./MongoUsersManager');
const MongoClient=require('mongodb').MongoClient;
const Index=require('./index');

router.get('/', async function(req, res) {
  await (new MongoUsersManager(Index.database)).addUser('clement', 'root');
  res.end();
});
module.exports = router;
