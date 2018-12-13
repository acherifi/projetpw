import { Input } from '@angular/core';
import { Movie } from '../../services/objects/Movie';
import { IParam } from '../../services/objects/sortParameters/IParam';
import {SortService} from '../../services/SortService';
import { ParamGenre} from '../../services/objects/sortParameters/ParamGenre';

export abstract class AbstractSortBar {
  static this;
  @Input() dataGenres: string[];

  constructor(protected sortService: SortService) {
    AbstractSortBar.this = this;
    this.dataGenres = ['ceci est un test'];
  }
  async update(id: number, sortService: SortService) {
    if (await sortService.rawMoviesHasChanged(id)) {
      /*Ici on fait les paramètres qui sont en commun, donc on va dire que la possibilité de trié par
      genres est présente sur toutes les bar de tri*/
      const movies = (await sortService.getRawMovies(id));
      const dataGenres = [];
      for (let i = 0; i < movies.length; ++i) {
        await (await movies[i].getGenres()).forEach(async x => {
          if (await dataGenres.findIndex(y => y === x) === -1) {
            await dataGenres.push(x);
          }
        });
      }
      AbstractSortBar.this.dataGenres = await dataGenres;
    }
  }
  async onChangeGenres(objectsFromSelect) {
    // c'est un handler commun à toutes les barres
    await AbstractSortBar.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamGenre(value));
  }

  async onChangeGeneral(objects, constructorParam) {
    for (let i = 0; i < objects.options.length; ++i) {
      const param = await constructorParam(objects.options[i].value);
        if (!objects.options[i].selected) {
          await AbstractSortBar.this.removeParamFromService(param);
        } else {
          await AbstractSortBar.this.addParamToService(param);
        }
      }
  }
  async addParamToService(param: IParam) {
    await this.sortService.addParam(await this.getId(), param);
  }
  async removeParamFromService(param: IParam) {
    await this.sortService.removeParam(await this.getId(), param);
  }
  abstract getId(): number;
}
