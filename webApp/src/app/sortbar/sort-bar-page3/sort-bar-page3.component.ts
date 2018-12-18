import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/sortParameters/IParam';
import { ParamGenre } from '../../../services/objects/sortParameters/ParamGenre';
import { ParamCity } from '../../../services/objects/sortParameters/ParamCity';
import { ParamCinemaName } from '../../../services/objects/sortParameters/ParamCinemaName';


@Component({
  selector: 'app-sort-bar-page3',
  templateUrl: './sort-bar-page3.component.html',
  styleUrls: ['./sort-bar-page3.component.css']
})
export class SortBarPage3Component extends AbstractSortBar implements OnInit {
  static this: any;
  @Input() dataCities: String[];
  @Input() dataCinemaNames: String[];
  constructor(protected sortService: SortService) {
    super(sortService);
    SortBarPage3Component.this = this;
    this.sortService.addObserversHandlers(this.handlerUpdate);
  }
  async handlerUpdate(sortService: SortService) {
    await SortBarPage3Component.this.update(SortBarPage3Component.this.getId(), sortService);
  }

  async ngOnInit() {
  }
  getId(): number {
    return 3;
  }
  async onChangeGenres(objectsFromSelect) {
    // c'est un handler commun à toutes les barres
    await SortBarPage3Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamGenre(value));
  }
  async onChangeCities(objectsFromSelect) {
    await SortBarPage3Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamCity(value));
    // await SortBarPage3Component.this.update(SortBarPage3Component.this.getId(), SortBarPage3Component.this.sortService);
  }
  async onChangeCinemaNames(objectsFromSelect) {
    await SortBarPage3Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamCinemaName(value));
  }
  async update(id: number, sortService: SortService) {
    await super.update(id, sortService);
    const functionRangeTheaters = async(films: Movie[], f) => {
      if (films !== undefined) {
        for (let i = 0; i < films.length; ++i) {
          const theaters = await films[i].getTheaters();
          for (let j = 0; j < theaters.length; ++j) {
            await f(theaters[j]);
          }
        }
      }
    };
    let movies = [];
    if (await sortService.rawMoviesHasChanged(id)) {
      movies = await sortService.getRawMovies(id);
      const tempoCities: String[] = [];
      await functionRangeTheaters(movies, async (theater) => {
        const city = await theater.getCity();
        if (await tempoCities.findIndex(x => x === city) === -1) {
          await tempoCities.push(city);
        }
      });
      this.dataCities = tempoCities;

    }
    if (await sortService.sortedMoviesHasChanged(id)) {
      movies = await sortService.getSortedMovies(id);
      const tempoCinemaNames: String[] = [];
      const paramsSort: IParam[] = await sortService.getParams(id);
      const allCitiesParams = await this.sortService.getParamsByKey(id, await (await new ParamCity('')).getKey());
      const allCitiesParamsNames = [];
      for (let i = 0; i < allCitiesParams.length; ++i) {
        await allCitiesParamsNames.push(await allCitiesParams[i].getValue());
      }
      await functionRangeTheaters(movies, async (theater) => {
        const cityToTest = await theater.getCity();
        const cinemaNameToTest = await theater.getName();
        if (await tempoCinemaNames.findIndex(x => x === cinemaNameToTest) === -1 && await (allCitiesParamsNames.findIndex
          (city => city === cityToTest)) !== -1) {
          await tempoCinemaNames.push(cinemaNameToTest);
        }
      });
      this.dataCinemaNames = tempoCinemaNames;
    }

  }
}
