import {Watchlist} from './Watchlist';
export class User {
  private email: String;
  private password: String;
  private id: String;
  private watchlist: Watchlist;
  constructor(email: String, password: String) {
    this.email = email;
    this.password = password;
  }
  async setWatchlist(watchlist: Watchlist) {
    this.watchlist = watchlist;
  }
  async setId(id: String) {
    this.id = id;
  }
  async getWatchlist(): Promise<Watchlist> {
    return this.watchlist;
  }
  async getId(): Promise<String> {
    return this.id;
  }
  async getEmail(): Promise<String> {
    return this.email;
  }
  async getPassword(): Promise<String> {
    return this.password;
  }
  async toString(): Promise<String> {
    return (this.id === undefined ? ' ' : ('id:' + this.id)) + ' email: ' + this.email + ' password: ' + this.password
    + (this.watchlist === undefined ? ' ' : (' watchlist: ' + await this.watchlist.toString()));
  }
}
