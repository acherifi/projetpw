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
   * Pour la même clé de paramètres c'est un "ou" pour les films et quand c'est une autre clé c'est un "et"
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
    await this.setTrueToSortedParametersChanged(idPage);
    await this.setTrueToRawDataMovies(idPage);
  }
  async getRawMovies(idPage: number) {
    return await this.rawMovies.get(idPage);
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
  private async setTrueToRawDataMovies(idPage: number) {
    await this.rawDataHasChanged.set(idPage, true);
    await this.callHandlersObservers();
    await this.rawDataHasChanged.set(idPage, false);
  }
  private async setTrueToSortedParametersChanged(idPage: number) {
    await this.sortedParametersHasChanged.set(idPage, true);
    await this.callHandlersObservers();
    await this.sortedParametersHasChanged.set(idPage, false);
  }


}
