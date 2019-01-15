import { Watchlist} from './objects/Watchlist';

export class WatchlistService {
  public api_url: string;
  constructor(api_url: string) {
    this.api_url = api_url;
  }
  async getWatchlistById(id: string): Promise<Watchlist> {
    const res = await this.doGetRequest(id);
    return await new Watchlist(res.movies, res.id);
  }
  async addMovieToWatchlist(wl: Watchlist, movieId: string): Promise<boolean> {
    const b = await this.doPostRequest(await wl.getId() + '/add', {
      movieid : movieId
    });
    if (b) {
      await wl.addMovie(movieId);
    }
    return b;
  }
  async removeMovieFromWatchlist(wl: Watchlist, movieId: string): Promise<boolean> {
    const b = await this.doDeleteRequest(await wl.getId() + '/', {
      movieid : movieId
    });
    if (b) {
      await wl.removeMovie(movieId);
    }
    return b;
  }
  private async getUrl(): Promise<string> {
    return this.api_url + '/watchlist/';
  }
  private async doGetRequest(params: string) {
    const result = await fetch(await this.getUrl() + params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const jsonResult = await result.json();
    return jsonResult;
  }
  private async doRequestWithData(method: string, params: string, data: {}): Promise<boolean> {
    const result = await fetch(await this.getUrl() + params, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return result.status === 201;
  }
  private async doPostRequest(params: string, data: {}): Promise<boolean> {
    return await this.doRequestWithData('POST', params, data);
  }
  private async doDeleteRequest(params: string, data: {}): Promise<boolean> {
    return await this.doRequestWithData('DELETE', params, data);
  }

}
