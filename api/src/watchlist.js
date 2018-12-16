const express=require('express');
const router = express.Router();
const MongoWatchlistManager = require('./MongoWatchlistManager');
const Index=require('./index');

router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await ( await new MongoWatchlistManager(Index.database)).getWatchlistById(req.params.id)));
  await res.end();
});
router.post('/:id/add', async function(req, res) {
  let resultAdd = (req.body.movieid !== undefined);
  resultAdd &= await (new MongoWatchlistManager(Index.database))
      .addMovieToWatchlistById(req.params.id, req.body.movieid);
  await resultAdd ? await res.sendStatus(201) : await res.sendStatus(409);
});
router.delete('/:id', async function(req, res) {
  let resultAdd = (req.body.movieid !== undefined);
  resultAdd &= await (new MongoWatchlistManager(Index.database))
      .removeMovieFromWatchlistById(req.params.id, req.body.movieid);
  await resultAdd ? await res.sendStatus(201) : await res.sendStatus(409);
});
module.exports = router;
