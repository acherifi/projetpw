import { UserService } from './UserService';
import { MovieService } from './MovieService';
import { WatchlistService } from './WatchlistService';
export const API_URL = 'https://localhost:4000';
export class APIToolService {
  private watchlistService: WatchlistService;
  private userService: UserService;
  private movieService: MovieService;
  constructor() {
    this.watchlistService = new WatchlistService();
    this.watchlistService.api_url = API_URL;
    this.userService = new UserService();
    this.userService.api_url = API_URL;
    this.movieService = new MovieService();
    this.movieService.api_url = API_URL;
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
