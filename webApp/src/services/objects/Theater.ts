import { Show } from './Show';
import { IParam } from './sortParameters/IParam';
import { ParamCity} from './sortParameters/ParamCity';
import { ParamCinemaName} from './sortParameters/ParamCinemaName';
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
  async contains(param: IParam): Promise<boolean> {
    const value = await param.getValue();
    if (await param.getKey() === (await (await new ParamCity('')).getKey())) {
      return (this.city === value);
    } else if (await param.getKey() === (await (await new ParamCinemaName('')).getKey())) {
      return (this.name === value);
    }
    return false;
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
