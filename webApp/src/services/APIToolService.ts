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
  getWatchListService(): WatchlistService {
    return this.watchlistService;
  }
  getUserService(): UserService {
    return this.userService;
  }
  getMovieService(): MovieService {
    return this.movieService;
  }
}
