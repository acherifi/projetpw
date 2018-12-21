const sum = require('./tempo');
const MongoUsersManager = require('../../MongoUsersManager');
const MongoClient=require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://root:cinewebpw1@ds061839.mlab.com:61839/cineweb';
const DATA_BASE = 'cineweb';

let mongoClient;
let database;
beforeEach(async () => {
  await (async () =>{
    mongoClient = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
    try {
      database = await mongoClient.db(DATA_BASE);
    } catch (e) {
      console.error(e);
    }
  })();
});
test('add user', async () => {
  const a = await new MongoUsersManager(database);
  await (async () =>{
    let users = await a.getAllUser();
    await console.log(users);
    await expect(sum(1, 2)).toBe(3);
    users = null;
  })();
});
afterAll(async () => {
  await mongoClient.close();
});
