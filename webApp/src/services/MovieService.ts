import { Movie } from './objects/Movie';
import { IParam } from './objects/sortParameters/IParam';
import { ParamInterval } from './objects/sortParameters/ParamInterval';

export class MovieService {
  public api_url = 'https://localhost:4000'; // default value
  constructor() {

  }
  async getMovieById(id: String): Promise<Movie> {
    const jsonResult = await this.doRequest( id);
    const m = await new Movie();
    await m.init(jsonResult);
    return m;
  }
  async getMovieByIdWithShowTimes(id: String, params: IParam[]): Promise<Movie> {
    let toAddToRequest = id + '/?';
    await params.forEach(x => toAddToRequest += x.getKey() + '=' + x.getValue() + '&');
    const jsonResult = await this.doRequest(toAddToRequest);
    const m = await new Movie();
    await m.init(jsonResult);
    return m;
  }
  async getMoviesByIdsWithShowTimes(ids: String[], interval: ParamInterval, params: IParam[]): Promise<Movie[]> {
    const res = [];
    const intervalConvert = await interval.getArrayValue();
    for (let i =  intervalConvert[0]; i < ids.length && i < intervalConvert[1]; ++i) {
        await res.push(await this.getMovieByIdWithShowTimes(ids[i], params));
    }
    return res;
  }
  async getMoviesByIds(ids: String[], interval: ParamInterval): Promise<Movie[]> {
    const res = [];
    const intervalConvert = await interval.getArrayValue();
    for (let i =  intervalConvert[0]; i < ids.length && i < intervalConvert[1]; ++i) {
        await res.push(await this.getMovieById(ids[i]));
    }
    return res;
  }
  async getRecentMovies(interval: ParamInterval): Promise<Movie[]> {
    const values = await interval.getArrayValue();
    const key = await interval.getKey();
    const toAddToRequest = '?' + key + '[]=' + values[0] + '&' + key + '[]=' + values[1];
    const jsonResult = await this.doRequest(toAddToRequest);
    const res: Movie[] = [];
    for (let i = 0; i < jsonResult.length; ++i) {
        const m = await new Movie();
        await m.init(jsonResult[i]);
        await res.push(m);
    }
    return res;
  }
  private async doRequest(params: String) {
      const result = await fetch(this.api_url + '/movies/' + params, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const jsonResult = await result.json();
      return jsonResult;
  }
}
