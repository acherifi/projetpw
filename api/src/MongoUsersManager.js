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
      await (await this.getCollection()).insertOne({id: uniqueID(), email: mail, password: pwd,
        idwatch: newIdWathlist});
      return true;
    } else {
      console.log('user existe déjà');
      return false;
    }
  }
  async getUserById(userId) {
    const data = await (await (await this.getCollection()).find({id: userId})).toArray();
    await this.clearJSONFromMongo(data[0]);
    if (data[0] === undefined) {
      return '{}';
    }
    return data[0];
  }
  async getAllUser() {
    const data = await (await (await this.getCollection()).find({})).toArray();
    for (let i = 0; i < data.length; i++) {
      await this.clearJSONFromMongo(data[i]);
    }
    return data;
  }
  async userExists(mail) {
    let res = false;
    const data = await (await (await this.getCollection()).find({email: mail})).toArray();
    res = data.length > 0;
    return res;
  }
  async getCollection() {
    return await this.database.collection('users');
  }
  /**
   * We don't want to use the id from mongo, so we delete mongo's id from data
   * @param {JSON} data
   */
  async clearJSONFromMongo(data) {
    if (data !== null && data !== undefined) {
      await delete data._id;
    }
  }
};
