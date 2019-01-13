const MongoClient=require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://127.0.0.1:12345/test';
const DATA_BASE = 'cineweb';
const MongoUsersManager = require('../../src/MongoUsersManager');
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
beforeEach(async () => {
  //remove all users
  const manager = await new MongoUsersManager(database);
  await (await manager.getCollection()).deleteMany({});
})
test('get all users', async() => {
  const u = await new MongoUsersManager(database);
  const a = await u.getAllUser();
  expect(a.length).toBe(0);
});
test('add user', async () => {
  const u = await new MongoUsersManager(database);
  await u.addUser('test@test.com', 'test');
  const users = await u.getAllUser();
  expect(users.length).toBe(1);
  expect(users[0].email).toBe('test@test.com');
  expect(users[0].password).toBe('test');
});
test('user exists', async() => {
  const u = await new MongoUsersManager(database);
  await u.addUser('test@test.com', 'test');
  const b = await u.userExists('test@test.com');
  expect(b).toBe(true);
});