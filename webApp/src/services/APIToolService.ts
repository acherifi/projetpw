import { UserService } from './UserService';
import { MovieService } from './MovieService';
import { WatchlistService } from './WatchlistService';
export const API_URL = 'https://apicineweb.herokuapp.com';
export class APIToolService {
  private watchlistService: WatchlistService;
  private userService: UserService;
  private movieService: MovieService;
  constructor() {
    this.watchlistService = new WatchlistService(API_URL);
    this.userService = new UserService(API_URL);
    this.movieService = new MovieService(API_URL);
  }
  async getWatchListService(): Promise<WatchlistService> {
    return this.watchlistService;
  }
  async getUserService(): Promise<UserService> {
    return this.userService;
  }
  async getMovieService(): Promise<MovieService> {
    return this.movieService;
  }
}
