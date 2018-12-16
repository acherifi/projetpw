const uniqueID = () => require('uniqid')('cw-');
module.exports = class MongoWatchlistManager {
  constructor(database) {
    this.database = database;
  }

  /**
   * return the id of a new watchlist.
   */
  async createWatchlist() {
    const newId = await uniqueID();
    await (await this.getCollection()).insertOne({id: newId, movies: []});
    return newId;
  }
  async getWatchlistById(watchlistId) {
    const data = await (await this.getCollection()).findOne({id: watchlistId});
    await this.clearJSONFromMongo(data);
    return data;
  }
  async addMovieToWatchlistById(watchlistId, movieId) {
    const watchlist = await this.getWatchlistById(watchlistId);
    if (watchlist !== undefined) {
      await (await this.getCollection()).updateOne({id: watchlistId}, {$addToSet: {movies: movieId}});
      return true;
    } else {
      return false;
    }
  }
  async removeMovieFromWatchlistById(watchlistId, movieId) {
    const watchlist = await this.getWatchlistById(watchlistId);
    if (watchlist !== undefined) {
      await (await this.getCollection()).updateOne({id: watchlistId}, {$pull: {movies: movieId}});
      return true;
    } else {
      return false;
    }
  }
  async getCollection() {
    return await this.database.collection('watchlists');
  }
  async clearJSONFromMongo(data) {
    if (data !== null && data !== undefined) {
      await delete data._id;
    }
  }
};
