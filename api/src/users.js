const express=require('express');
const router = express.Router();
const MongoUsersManager = require('./MongoUsersManager');
const Index=require('./index');


router.get('/', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.send(await JSON.stringify(await (await new MongoUsersManager(Index.database)).getAllUser()));
  await res.end();
});
router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  const manager = await new MongoUsersManager(Index.database);
  let which;
  if (req.params.id.includes('@')){
    which = await manager.getUserByEmail(req.params.id);
  } else {
    which = await manager.getUserById(req.params.id);
  }
  await res.write(await JSON.stringify(which));
  await res.end();
});
router.post('/add', async function(req, res) {
  let resultAdd = (req.body.email !== undefined && req.body.password !== undefined);
  resultAdd &= await (await new MongoUsersManager(Index.database)).addUser(req.body.email, req.body.password);
  await resultAdd ? await res.sendStatus(201) : await res.sendStatus(409);
});
module.exports = router;
