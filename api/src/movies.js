const express=require('express');
const router = express.Router();
const MoviesManager = require('./AllocineMoviesManager');

router.get('/', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await (new MoviesManager()).
      getRecentMoviesInTheaters(await formatInterval(req.query.interval))));
  await res.end();
});
router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await (new MoviesManager()).getMovieById(req.params.id,
      await createShowTimeParametersFromBody(req.query))));
  await res.end();
});
function createShowTimeParametersFromBody(query) {
  console.log('query: '+query);
  let parametersShowTimes = undefined;
  if (query.latitude !== undefined && query.longitude !== undefined) {
    let radius = 10; // default radius value
    if (query.radius !== undefined) {
      radius = query.radius;
    }
    parametersShowTimes = {
      'latitude': query.latitude,
      'longitude': query.longitude,
      'radius': radius,
    };
  }
  return parametersShowTimes;
}
function formatInterval(intervalFromQuery) {
  if (intervalFromQuery === undefined || intervalFromQuery.length < 2) {
    return undefined;
  }
  if (intervalFromQuery[0] >= intervalFromQuery[1] || intervalFromQuery[0] < 0 || intervalFromQuery[1] < 0) {
    return undefined;
  }
  return intervalFromQuery;
}
module.exports = router;
