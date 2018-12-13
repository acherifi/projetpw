import { IParam } from './objects/sortParameters/IParam';
import { Movie } from './objects/Movie';
type HandlerObserverSortService = (origin: SortService) => any;
export class SortService {
  private sortParameters: Map<number, IParam[]>;
  private sortedParametersHasChanged: Map<number, boolean>;
  private rawMovies: Map<number, Movie[]>;
  private rawDataHasChanged: Map<number, boolean>;
  private handlersObservers: HandlerObserverSortService[];

  constructor() {
    this.sortParameters = new Map<number, IParam[]>();
    this.sortedParametersHasChanged = new Map<number, boolean>();
    this.rawMovies = new Map<number, Movie[]>();
    this.rawDataHasChanged = new Map<number, boolean>();
    this.handlersObservers = [];
  }
  async addParam(idPage: number, param: IParam) {
    await console.log(await this.sortParameters.get(idPage));
     if (await this.sortParameters.get(idPage) === undefined) {
       await this.sortParameters.set(idPage, []);
     }
     const index = await (await this.sortParameters.get(idPage)).findIndex(x => x.equals(param));
     if (index === -1) {
       await this.sortParameters.get(idPage).push(param);
       await this.setTrueToSortedParametersChanged(idPage);
     }
  }
  async removeParam(idPage: number, param: IParam) {
    if (await this.sortParameters.get(idPage) !== undefined) {
      const index = await this.sortParameters.get(idPage).findIndex(x => x.equals(param));
      if (index !== -1) {
        await this.sortParameters.set(idPage, await (await this.sortParameters.get(idPage).
        filter(x => !x.equals(param))));
        await this.setTrueToSortedParametersChanged(idPage);
      }
    }
  }
  async getParams(idPage: number): Promise<IParam[]> {
    return await this.sortParameters.get(idPage);
  }
  async getSortedMovies(idPage: number): Promise<Movie[]> {
    const rawMovies = await this.rawMovies.get(idPage);
    const sortedMovies = [];
    const params = (await this.sortParameters.get(idPage));
    if (params === undefined || params.length === 0) {
      return await this.rawMovies.get(idPage);
    }
    for (let i = 0; i < params.length; ++i) {
      for (let j = 0; j < rawMovies.length; ++j) {
        if (await rawMovies[j].contains(params[i])  && await sortedMovies.findIndex(x => x === rawMovies[j]) === -1) {
          await sortedMovies.push(rawMovies[j]);
        }
      }
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
