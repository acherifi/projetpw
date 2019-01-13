const MongoClient=require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://127.0.0.1:12345/test';
const DATA_BASE = 'cineweb';
const MongoWatchlistManager = require('../../src/MongoWatchlistManager');
let database;
beforeAll(async () => {
  await (async () => {
    try {
      const mongoClient = await MongoClient.connect(MONGO_URL, {
        useNewUrlParser: true,
      });
      database = await mongoClient.db(DATA_BASE);
    } catch (e) {
      console.error(e);
    }
  })();
}, 10000);
let user;
let manager;
beforeAll(async () => {
  //remove all watchlist
  manager = await new MongoWatchlistManager(database);
  await (await manager.getCollection()).deleteMany({});
});
test('create new Watchlist', async() => {
  const id = await manager.createWatchlist();
  const watchlist = await manager.getWatchlistById(id);
  expect(watchlist.id).toBe(id);
  expect(watchlist.movies.length).toBe(0);
})
test('add movie to watchlist', async() => {
  const id = await manager.createWatchlist();
  await manager.addMovieToWatchlistById(id, 42);
  const watchlist = await manager.getWatchlistById(id);
  expect(watchlist.movies.length).toBe(1);
  expect(watchlist.movies[0]).toBe(42);
});
test('remove movie from watchlist', async() => {
  const id = await manager.createWatchlist();
  await manager.addMovieToWatchlistById(id, 42);
  await manager.removeMovieFromWatchlistById(id, 42);
  const watchlist = await manager.getWatchlistById(id);
  expect(watchlist.movies.length).toBe(0);
});


