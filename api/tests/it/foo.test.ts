
const MongoClient=require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://root:cinewebpw1@ds061839.mlab.com:61839/cineweb';
const DATA_BASE = 'cineweb';
const MongoUsersManager = require('../../src/MongoUsersManager');
let database;
beforeEach(async () => {
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

test('basic', async () => {
  const u = await new MongoUsersManager(database);
  const a = await u.getAllUser();
  expect(a).not.toBe('');
  console.log(a);
});