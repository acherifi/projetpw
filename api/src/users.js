const express=require('express');
const router = express.Router();
const MongoUsersManager = require('./MongoUsersManager');
const MongoWatchlistManager = require('./MongoWatchlistManager');
const Index=require('./index');


router.get('/', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.send(JSON.stringify(await (new MongoUsersManager(Index.database)).getAllUser()));
  await (new MongoWatchlistManager(Index.database)).removeMovieFromWatchlistById('cw-9zlu4p1w3ujpecuejv', 'ah!');
  await res.end();
});
router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await (new MongoUsersManager(Index.database)).getUserById(req.params.id)));
  await res.end();
});
router.post('/add', async function(req, res) {
  let resultAdd = (req.body.email !== undefined && req.body.password !== undefined);
  resultAdd &= await (new MongoUsersManager(Index.database)).addUser(req.body.email, req.body.password);
  await resultAdd ? await res.sendStatus(201) : await res.sendStatus(409);
});
module.exports = router;
