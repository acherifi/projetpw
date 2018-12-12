import { IParam } from './objects/sortParameters/IParam';
import { Movie } from './objects/Movie';
type HandlerObserverSortService = (origin: SortService) => any;
export class SortService {
  private sortParameters: Map<number, IParam[]>;
  private sortedParametersHasChanged: Map<number, boolean>;
  private rawMovies: Map<number, Movie[]>;
  private rawMoviesHasChanged: Map<number, boolean>;
  private handlersObservers: HandlerObserverSortService[];

  constructor() {
    this.sortParameters = new Map<number, IParam[]>();
    this.sortedParametersHasChanged = new Map<number, boolean>();
    this.rawMovies = new Map<number, Movie[]>();
    this.rawMoviesHasChanged = new Map<number, boolean>();
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
       await this.sortedParametersHasChanged.set(idPage, true);
     }
  }
  async removeParam(idPage: number, param: IParam) {
    if (await this.sortParameters.get(idPage) !== undefined) {
      const index = await this.sortParameters.get(idPage).findIndex(x => x.equals(param));
      if (index !== -1) {
        await delete this.sortParameters.get(idPage)[index];
        await this.sortedParametersHasChanged.set(idPage, true);
      }
    }
  }
  async getParams(idPage: number): Promise<IParam[]> {
    return await this.sortParameters.get(idPage);
  }
  async getSortedMovies(idPage: number): Promise<Movie[]> {
    const rawMovies = await this.rawMovies.get(idPage);
    const sortedMovies = [];
    const params = await this.sortParameters.get(idPage);
    for (let i = 0; i < params.length; ++i) {
      for (let j = 0; j < rawMovies.length; ++j) {
        if (await rawMovies[j].contains(params[i])) {
          await console.log('add sorted');
          await sortedMovies.push(rawMovies[j]);
        }
      }
    }
    await console.log('fin sorted');
    return sortedMovies;
  }
  async sortedMoviesHasChanged(idPage: number) {
    return await this.sortedParametersHasChanged.get(idPage);
  }
  async setRawMovies(idPage: number, movies: Movie[]) {
    await console.log('set raw movies');
    await this.rawMovies.set(idPage, movies);
    await this.rawMoviesHasChanged.set(idPage, true);
    await this.callHandlersObservers();
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
    console.log('call handlers');
    for (let i = 0; i < this.handlersObservers.length; ++i) {
      await this.handlersObservers[i](this);
    }
  }


}
