import { Theater } from './Theater';
import { IParam } from './sortParameters/IParam';
import {ParamDirector} from './sortParameters/ParamDirector';
import { ParamGenre} from './sortParameters/ParamGenre';
import { ParamReleaseDate } from './sortParameters/ParamReleaseDate';
export class Movie {

  private theaters: Theater[];
  private title: String;
  private synopsis: String;
  private posterLink: String;
  private actors: String[];
  private directors: String[];
  private genres: String[];
  private id: Number;
  private rate: Number;
  private releaseDate: Date;
  async init(movieJSON) {
    await this.fillData(movieJSON);
  }
  getTheaters(): Theater[] {
    return this.theaters;
  }
  getTitle(): String {
    return this.title;
  }
  getSynopsis(): String {
    return this.synopsis;
  }
  getPosterLink(): String {
    return this.posterLink;
  }
  getDirectors(): String[] {
    return this.directors;
  }
  getActors(): String[] {
    return this.actors;
  }
  getGenres(): String[] {
    return this.genres;
  }
  getId(): Number {
    return this.id;
  }
  getRate(): Number {
    return this.rate;
  }
  getReleaseDate(): Date {
    return this.releaseDate;
  }
  async toString() {
    let res = '';
    res += this.id + ': ' + this.title + ' ; ' + this.releaseDate + ' ; ' + this.synopsis + ' ; ' + this.posterLink + ' ; ';
    res += ' actors: ';
    await this.actors.forEach(x => res += x + ' , ');
    res += ' directors: ';
    await this.directors.forEach(x => res += x + ' , ');
    res += ' genres: ';
    await this.genres.forEach(x => res += x + ' , ');
    res += ' rate: ' + this.rate;
    res += ' theaters: ';
    for (let i = 0; i < this.theaters.length; ++i) {
      res += await this.theaters[i].toString() + ' , ';
    }
    return res;
  }
  async contains(param: IParam): Promise<boolean> {
    const valueParam = await param.getValue();
    const compareFunction = (x => x === valueParam);
    if (await param.getKey() === (await (await new ParamDirector('')).getKey())) {
      return await (await this.directors.find(compareFunction)) !== undefined;
    } else if (await param.getKey() === (await (await new ParamGenre('')).getKey())) {
      return await (await this.genres.find(compareFunction)) !== undefined;
    } else if (await param.getKey() === (await (await new ParamReleaseDate('')).getKey())) {
      return await (await this.releaseDate.toDateString() === valueParam);
    }
    return false;
  }
  private async fillData(jsonResult) {
    const theaters = [];
    await jsonResult.infoshowtime.theaters.forEach(async x => {
      const tempoTheater = await new Theater();
      await tempoTheater.init(x);
      await theaters.push(tempoTheater);
    });
    this.theaters = theaters;

    this.actors = await this.forEachFillData(jsonResult.infomovie.actors);
    this.directors = await this.forEachFillData(jsonResult.infomovie.directors);
    this.genres = await this.forEachFillData(jsonResult.infomovie.genres);
    this.id = jsonResult.infomovie.id;
    this.posterLink = jsonResult.infomovie.poster;
    this.synopsis = jsonResult.infomovie.synopsis;
    this.title = jsonResult.infomovie.title;
    this.rate = jsonResult.infomovie.rate;

    const tempoDate = await jsonResult.infomovie.releasedate.split('-');
    this.releaseDate = await new Date(tempoDate[0], tempoDate[1], tempoDate[2]);
  }
  private async forEachFillData(array) {
    const tempo = [];
    await array.forEach(async x => await tempo.push(x));
    return tempo;
  }
}
