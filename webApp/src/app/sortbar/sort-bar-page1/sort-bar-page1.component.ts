import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { ParamReleaseDate } from '../../../services/objects/sortParameters/ParamReleaseDate';
import { ParamGenre} from '../../../services/objects/sortParameters/ParamGenre';
import { MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-sort-bar-page1',
  templateUrl: './sort-bar-page1.component.html',
  styleUrls: ['./sort-bar-page1.component.css']
})
export class SortBarPage1Component extends AbstractSortBar implements OnInit {
  static this: any;
  @Input() dataReleaseDates;
  constructor(protected sortService: SortService) {
    super(sortService);
    SortBarPage1Component.this = this;
    this.sortService.addObserversHandlers(this.handlerUpdate);
  }
  async handlerUpdate(sortService: SortService) {
    await SortBarPage1Component.this.update(SortBarPage1Component.this.getId(), sortService);
  }
  async onChangeReleaseDates(objectsFromSelect) {
    await SortBarPage1Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamReleaseDate(value));
  }

  ngOnInit() {
  }
  async update(idPage: number, sortService: SortService) {
    await super.update(idPage, sortService);
    if (await sortService.rawMoviesHasChanged(idPage)) {
      const movies = (await sortService.getRawMovies(idPage));
      const dataReleaseDates = [];
      for (let i = 0; i < movies.length; ++i) {
        const movieRelease = await movies[i].getReleaseDate().toDateString();
        if (await dataReleaseDates.findIndex(x => x === movieRelease) === -1) {
          await dataReleaseDates.push(movieRelease);
        }
      }
      this.dataReleaseDates = dataReleaseDates;
    }
  }
  getId(): number {
    return 1;
  }
  async onChangeGenres(objectsFromSelect: MatSelectionListChange) {
    // c'est un handler commun à toutes les barres
    await SortBarPage1Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamGenre(value));
  }
}
