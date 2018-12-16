export class Watchlist {
  private moviesIds: String[];
  private id: String;
  constructor(moviesIds: String[], id: String) {
    this.moviesIds = moviesIds;
    this.id = id;
  }
  async getMoviesIds(): Promise<String[]> {
    return this.moviesIds;
  }
  async getId(): Promise<String> {
    return this.id;
  }
  async addMovie(id: string) {
    await this.moviesIds.push(id);
  }
  async removeMovie(id: string) {
    this.moviesIds = await this.moviesIds.filter(x => x !== id);
  }
  async toString(): Promise<String> {
    let res = 'id :' + this.id + ' moviesIds: ';
    await this.moviesIds.forEach(x => res += x);
    return res;
  }
}
