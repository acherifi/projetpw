import { IParam } from './objects/sortParameters/IParam';
import { Movie } from './objects/Movie';
type HandlerObserverSortService = (origin: SortService) => any;
export class SortService {
  private sortParameters: Map<number, Map<String, IParam[]>>;
  private sortedParametersHasChanged: Map<number, boolean>;
  private rawMovies: Map<number, Movie[]>;
  private rawDataHasChanged: Map<number, boolean>;
  private handlersObservers: HandlerObserverSortService[];

  constructor() {
    this.sortParameters = new Map<number, Map<String, IParam[]>>();
    this.sortedParametersHasChanged = new Map<number, boolean>();
    this.rawMovies = new Map<number, Movie[]>();
    this.rawDataHasChanged = new Map<number, boolean>();
    this.handlersObservers = [];
  }
  async addParam(idPage: number, param: IParam) {
     if (await this.sortParameters.get(idPage) === undefined) {
       await this.sortParameters.set(idPage, await new Map<String, IParam[]>());
     }
     if (await (await this.sortParameters.get(idPage)).get(param.getKey()) === undefined) {
      await this.sortParameters.get(idPage).set(await param.getKey(), []);
     }
     const index = (await (await this.sortParameters.get(idPage)).get(await param.getKey())).findIndex(x => x.equals(param));
     if (index === -1) {
       await (await (await this.sortParameters.get(idPage)).get(await param.getKey())).push(await param);
       await this.setTrueToSortedParametersChanged(idPage);
     }
  }
  async removeParam(idPage: number, param: IParam) {
    if (await this.sortParameters.get(idPage) !== undefined &&
    await this.sortParameters.get(idPage).get(await param.getKey()) !== undefined) {
      const index = await (await (await (this.sortParameters.get(idPage)).get(await param.getKey()))).findIndex(x => x.equals(param));
      if (index !== -1) {
        await this.sortParameters.get(idPage).set(param.getKey(), await (await this.sortParameters.get(idPage).
        get(await param.getKey())).filter(x => !x.equals(param)));
        await this.setTrueToSortedParametersChanged(idPage);
      }
    }
  }
  async getParams(idPage: number): Promise<IParam[]> {
    const tempoParams: IParam[] = [];
    const mapParams = await this.sortParameters.get(idPage);
    if (mapParams !== undefined) {
      await (await Array.from(await mapParams.keys())).forEach( async k => {
        const params = await mapParams.get(k);
        for (let i = 0; i < params.length; ++i) {
          await tempoParams.push(params[i]);
        }
      });
    }
    return tempoParams;
  }
  async getParamsByKey(idPage: number, key: String): Promise<IParam[]> {
    const mapParams = await this.sortParameters.get(idPage);
    if (mapParams !== undefined) {
      const res = await mapParams.get(key);
      if (res !== undefined) {
        return res;
      }
    }
    return [];
  }
  /**
   * For the same parameters key we apply "or" sort and between different keys we apply "and"
   */
  async getSortedMovies(idPage: number): Promise<Movie[]> {
    const functionRespectParams = async (movie: Movie, params: IParam[]): Promise<boolean> => {
      let res = params.length === 0;
      for (let i = 0; i < params.length; ++i) {
        if (await movie.contains(params[i])) {
          res = true;
          break;
        }
      }
      return res;
    };
    const rawMovies = await this.rawMovies.get(idPage);
    const mapParams = await this.sortParameters.get(idPage);
    if (mapParams === undefined) {
      return rawMovies;
    }
    let sortedMovies = rawMovies;
    const keys = await Array.from(await mapParams.keys());
    for (let i = 0; i < keys.length; ++i) {
      const tempoSortedMovies = [];
      for (let j = 0; j < sortedMovies.length; ++j) {
        const params = await mapParams.get(keys[i]);
        if (await functionRespectParams(sortedMovies[j], params) === true) {
          await tempoSortedMovies.push(sortedMovies[j]);
        }
      }
      sortedMovies = tempoSortedMovies;
    }
    return sortedMovies;
  }
  async rawMoviesHasChanged(idPage: number): Promise<boolean> {
    return await this.rawDataHasChanged.get(idPage);
  }
  async sortedMoviesHasChanged(idPage: number): Promise<boolean> {
    return await this.sortedParametersHasChanged.get(idPage);
  }
  async setRawMovies(idPage: number, movies: Movie[]) {
    await this.rawMovies.set(idPage, movies);
  }
  async getRawMovies(idPage: number): Promise<Movie[]> {
    const res = await this.rawMovies.get(idPage);
    if (res === undefined ) {
      return [];
    }
    return res;
  }
  async addObserversHandlers(handler: HandlerObserverSortService) {
    if (await this.handlersObservers.findIndex(x => x === handler) === -1) {
      await this.handlersObservers.push(handler);
    }
  }
  async callHandlersObservers() {
    for (let i = 0; i < this.handlersObservers.length; ++i) {
      await this.handlersObservers[i](this);
    }
  }
  /**
   * Use to notify all observers that all raw movies in all pages has been changed.
   * It is used when the user add a movie in his watchlist.
   */
  async setTrueToAllRawDataMovies() {
    const keys = await Array.from(await this.rawMovies.keys());
    await keys.forEach(async x => await this.setTrueToRawDataMovies(x));
  }
  /**
   * Will notify observers (pages) that raw movies on page idPage has been changed
   */
  async setTrueToRawDataMovies(idPage: number) {
    await this.rawDataHasChanged.set(idPage, true);
    await this.callHandlersObservers();
    await this.rawDataHasChanged.set(idPage, false);
  }
  /**
   * Will notify observers (pages) that sorted movies on page idPage has been changed
   */
  async setTrueToSortedParametersChanged(idPage: number) {
    await this.sortedParametersHasChanged.set(idPage, true);
    await this.callHandlersObservers();
    await this.sortedParametersHasChanged.set(idPage, false);
  }


}
