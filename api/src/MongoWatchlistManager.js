const uniqueID = () => require('uniqid')('cw-');
module.exports = class MongoWatchlistManager {
  constructor(database) {
    this.database = database;
  }

  /**
   * return the id of a new watchlist.
   */
  async createWatchlist() {
    const newId = uniqueID();
    await this.getCollection().insertOne({id: newId, movies: []});
    return newId;
  }
  async getWatchlistById(watchlistId) {
    console.log(watchlistId);
    const data = await this.getCollection().find({id: watchlistId}).toArray();
    await this.clearJSONFromMongo(data[0]);
    return data[0];
  }
  async addMovieToWatchlistById(watchlistId, movieId) {
    const watchlist = await this.getWatchlistById(watchlistId);
    if (watchlist !== undefined) {
      await this.getCollection().updateOne({id: watchlistId}, {$addToSet: {movies: movieId}});
      return true;
    } else {
      return false;
    }
  }
  async removeMovieFromWatchlistById(watchlistId, movieId) {
    const watchlist = await this.getWatchlistById(watchlistId);
    if (watchlist !== undefined) {
      await this.getCollection().updateOne({id: watchlistId}, {$pull: {movies: movieId}});
      return true;
    } else {
      return false;
    }
  }
  getCollection() {
    return this.collection = this.database.collection('watchlists');
  }
  clearJSONFromMongo(data) {
    if (data !== null && data !== undefined) {
      delete data._id;
    }
  }
};
