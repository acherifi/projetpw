module.exports = class MongoWatchlistManager {
  constructor(database) {
    this.database = database;
    this.collection = this.database.collection('watchlists');
  }
};
