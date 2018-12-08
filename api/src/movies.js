const express=require('express');
const router = express.Router();
const MoviesManager = require('./AllocineMoviesManager');


router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await (new MoviesManager()).getMovieById(req.params.id)));
  await res.end();
});
module.exports = router;
