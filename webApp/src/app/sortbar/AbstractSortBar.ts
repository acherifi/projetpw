import { Input } from '@angular/core';
import { Movie } from '../../services/objects/Movie';
import { IParam } from '../../services/objects/sortParameters/IParam';
import {SortService} from '../../services/SortService';

export abstract class AbstractSortBar {
  static this;
  @Input() dataDirectors: string[];

  constructor(protected sortService: SortService) {
    AbstractSortBar.this = this;
    this.dataDirectors = ['ceci est un test'];
  }
  async update(id: number, sortService: SortService) {
    if (await sortService.rawMoviesHasChanged(id)) {
      /*Ici on fait les paramètres qui sont en commun, donc on va dire que la possibilité de trié par
      réalisateur est présente sur toutes les bar de tri*/
      const movies = (await sortService.getRawMovies(id));
      const dataDirectors = [];
      for (let i = 0; i < movies.length; ++i) {
        await (await movies[i].getDirectors()).forEach(async x => await dataDirectors.push(x));
      }
      AbstractSortBar.this.dataDirectors = await dataDirectors;
    }
  }
  submit() {
    // TODO: c'est l'event du bouton submit quoi
    // c'est un handler commun à toutes les barres de recherche
  }
  onChangeDirectors(result) {
    // TODO: event quand le choix des réalisateurs changent
    // c'est un handler commun à toutes les barres
  }
  async addParamToService(param: IParam) {

  }
  abstract getId(): number;
}
