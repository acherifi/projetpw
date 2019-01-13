const uniqueID = () => require('uniqid')('cw-');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const WatchlistManager = require('./MongoWatchlistManager');
module.exports = class MongoUsersManager {
  constructor(database) {
    this.database = database;
    this.watchlistManager = new WatchlistManager(this.database);
  }
  async addUser(clearEmail, pwd) {
    if (!await this.userExists(clearEmail)) {
      const newIdWathlist = await this.watchlistManager.createWatchlist();
      await (await this.getCollection()).insertOne({id: uniqueID(), email: await this.crypt(clearEmail), password: pwd,
        idwatch: newIdWathlist});
      return true;
    } else {
      console.log('user existe déjà');
      return false;
    }
  }
  async crypt(toCrypt) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const answer = bcrypt.hashSync(toCrypt, salt);
    return answer;
  }
  async getUserById(userId) {
    const data = await (await (await this.getCollection()).find({id: userId})).toArray();
    await this.clearJSONFromMongo(data[0]);
    if (data[0] === undefined) {
      return '{}';
    }
    return data[0];
  }
  async getUserByEmail(clearEmail) {
    const data = await (await (await this.getCollection()).find({})).toArray();
    for (let i = 0; i < data.length; ++i){
      if (bcrypt.compareSync(clearEmail, data[i].email)){
        await this.clearJSONFromMongo(data[i]);
        return data[i];
      }
    }
    return {};
  }
  async getAllUser() {
    const data = await (await (await this.getCollection()).find({})).toArray();
    for (let i = 0; i < data.length; i++) {
      await this.clearJSONFromMongo(data[i]);
    }
    return data;
  }
  async userExists(clearEmail) {
    return (await this.getUserByEmail(clearEmail)).id !== undefined;
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
