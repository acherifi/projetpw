const express=require('express');
const router = express.Router();
const MoviesManager = require('./AllocineMoviesManager');


router.get('/:id', async function(req, res) {
  await res.header('Content-Type', 'application/json');
  await res.write(JSON.stringify(await (new MoviesManager()).getMovieById(req.params.id,
      await createShowTimeParametersFromBody(req.query))));
  await res.end();
});
function createShowTimeParametersFromBody(query) {
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
module.exports = router;
