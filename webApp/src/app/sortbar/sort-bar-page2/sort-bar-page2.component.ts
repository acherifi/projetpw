import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { ParamGenre} from '../../../services/objects/sortParameters/ParamGenre';
import { ParamRate} from '../../../services/objects/sortParameters/ParamRate';

@Component({
  selector: 'app-sort-bar-page2',
  templateUrl: './sort-bar-page2.component.html',
  styleUrls: ['./sort-bar-page2.component.css']
})
export class SortBarPage2Component extends AbstractSortBar implements OnInit {
  static this: any;
  @Input() dataRates;
  constructor(protected sortService: SortService) {
    super(sortService);
    SortBarPage2Component.this = this;
    this.sortService.addObserversHandlers(this.handlerUpdate);
  }
  async handlerUpdate(sortService: SortService) {
    await SortBarPage2Component.this.update(SortBarPage2Component.this.getId(), sortService);
  }
  async onChangeRates(objectsFromSelect) {
    await SortBarPage2Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamRate(value));
  }
  async update(idPage: number, sortService: SortService) {
    await super.update(idPage, sortService);
    if (await sortService.rawMoviesHasChanged(idPage)) {
      const movies = await sortService.getRawMovies(idPage);
      const tempoRates: number[] = [];
      for (let i = 0; i < movies.length; ++i) {
        const movieRate = +(await movies[i].getRate());
        if (await tempoRates.findIndex(x => x === movieRate) === -1) {
          await tempoRates.push(movieRate);
        }
      }
      await tempoRates.sort((a, b) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        }
        return 0;
      });
      this.dataRates = await tempoRates.map(x => '' + x);
    }
  }
  ngOnInit() {
  }
  getId(): number {
    return 2;
  }
  async onChangeGenres(objectsFromSelect) {
    // c'est un handler commun à toutes les barres
    await SortBarPage2Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamGenre(value));
  }

}
