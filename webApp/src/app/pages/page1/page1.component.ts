import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {SortService} from '../../../services/SortService';
import {APIToolService} from '../../../services/APIToolService';
import {Movie} from '../../../services/objects/Movie';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {AbstractPage} from '../AbstractPage';
import {IButton} from '../../button/IButton';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['../page.component.css']
})
export class Page1Component extends AbstractPage implements OnInit {

  static this: any;
  constructor(protected sortService: SortService, protected apiToolService: APIToolService, protected dialog: MatDialog) {
    super(sortService, apiToolService, dialog);
    Page1Component.this = this;
  }
  async ngOnInit() {
    super.handleResponsive(window);
    await this.loadRawMovies(this.defaultMovieInterval);
    await this.sortService.setTrueToSortedParametersChanged(await this.getId());
    await this.sortService.setTrueToRawDataMovies(await this.getId());
  }
  /**
   * In the design pattern Observer, this is notify(), called by SortService.
   * So check if movies from SortService has changed, and if they changed, we set movies from the page.
   */
  async update(sortService: SortService) {
    super.updateAbstract(sortService, Page1Component.this);
  }
  getId(): number {
    return 1;
  }

  async getDataToPrintOnMovieDialog(movie: Movie) {
    const data = await super.getDataToPrintOnMovieDialog(movie);
    let actors = 'Actors:';
    await movie.getActors().forEach(async actor => {
      actors += actor + ', ';
    });
    data.data['actors'] = actors.slice(0, actors.length - 1);
    data.data['id'] = 'id' + await movie.getId();

    return data;
  }
  async clickOnAddToWatchlist(b: IButton) {
    super.clickOnAddToWatchlistAbstract(b, Page1Component.this);
  }
  /**
   * Raw movies is unsorted movies (movies print on screen without sorting).
   * @param interval because we can't load an infinity of movies, we need a interval
   */
  async loadRawMovies(interval: ParamInterval) {
    const recentMovies = await (await this.apiToolService.getMovieService()).getRecentMovies(interval);
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
}
