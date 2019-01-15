import { Input } from '@angular/core';
import { IParam } from '../../services/objects/sortParameters/IParam';
import {SortService} from '../../services/SortService';
import { MatSelectionListChange } from '@angular/material';


export abstract class AbstractSortBar {
  @Input() dataGenres: string[];
  constructor(protected sortService: SortService) {
    this.dataGenres = [''];
  }
  async update(idPage: number, sortService: SortService) {
    if (await sortService.rawMoviesHasChanged(idPage)) {
      /*Ici on fait les paramètres qui sont en commun, donc on va dire que la possibilité de trié par
      genres est présente sur toutes les bar de tri*/
      const movies = (await sortService.getRawMovies(idPage));
      const dataGenres = [];
      for (let i = 0; i < movies.length; ++i) {
        await (await movies[i].getGenres()).forEach(async x => {
          if (await dataGenres.findIndex(y => y === x) === -1) {
            await dataGenres.push(x);
          }
        });
      }
      this.dataGenres = await dataGenres;
    }
  }

  async onChangeGeneral(objects: MatSelectionListChange, constructorParam) {
    const array = objects.source.options.toArray();
    for (let i = 0; i < array.length; ++i) {
      const param = await constructorParam(array[i].getLabel().trim());
        if (!array[i].selected) {
          await this.removeParamFromService(param);
        } else {
          await this.addParamToService(param);
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
