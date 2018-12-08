const uniqueID = () => require('uniqid')('cw-');
const WatchlistManager = require('./MongoWatchlistManager');
module.exports = class MongoUsersManager {
  constructor(database) {
    this.database = database;
    this.watchlistManager = new WatchlistManager(this.database);
  }
  async addUser(mail, pwd) {
    if (!await this.userExists(mail)) {
      const newIdWathlist = await this.watchlistManager.createWatchlist();
      await this.getCollection().insertOne({id: uniqueID(), email: mail, password: pwd, idwatch: newIdWathlist});
      return true;
    } else {
      console.log('user existe déjà');
      return false;
    }
  }
  async getUserById(userId) {
    const data = await this.getCollection().find({id: userId}).toArray();
    await this.clearJSONFromMongo(data[0]);
    return data;
  }
  async getAllUser() {
    const data = await this.getCollection().find({}).toArray();
    for (let i = 0; i < data.length; i++) {
      await this.clearJSONFromMongo(data[i]);
    }
    return data;
  }
  async userExists(mail) {
    let res = false;
    const data = await this.getCollection().find({email: mail}).toArray();
    res = data.length > 0;
    return res;
  }
  getCollection() {
    return this.database.collection('users');
  }
  clearJSONFromMongo(data) {
    if (data !== null && data !== undefined) {
      delete data._id;
    }
  }
};
