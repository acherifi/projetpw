import { UserService } from './UserService';
import { MovieService } from './MovieService';
import { WatchlistService } from './WatchlistService';

export class APIToolService {
  private watchlistService: WatchlistService;
  private userService: UserService;
  private movieService: MovieService;
  constructor() {
    this.watchlistService = new WatchlistService();
    this.userService = new UserService();
    this.movieService = new MovieService();
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
