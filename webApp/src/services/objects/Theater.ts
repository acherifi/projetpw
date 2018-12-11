import { Show } from './Show';
export class Theater {
  private city: String;
  private name: String;
  private shows: Show[];
  async init(movieJSON) {
    await this.fillData(movieJSON);
  }
  getCity(): String {
    return this.city;
  }
  getName(): String {
    return this.name;
  }
  getShows(): Show[] {
    return this.shows;
  }
  async toString() {
    let res = 'name: ' + this.name + ' city: ' + this.city + ' ';
    for (let i = 0; i < this.shows.length; ++i) {
      res += await this.shows[i].toString();
    }
    return res;
  }
  private async fillData(filmShow) {
    this.city = filmShow.city;
    this.name = filmShow.name;
    this.shows = [];
    for (let i = 0; i < filmShow.filmshows.length; ++i) {
      for (let j = 0; j < filmShow.filmshows[i].length; ++j) {
        const tempoShow = await new Show();
        await tempoShow.init(filmShow.filmshows[i][j]);
        await this.shows.push(tempoShow);
      }
    }
  }

}
