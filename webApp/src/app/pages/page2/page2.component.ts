import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import {SortService} from '../../../services/SortService';
import {APIToolService} from '../../../services/APIToolService';
import {Movie} from '../../../services/objects/Movie';
import {Watchlist} from '../../../services/objects/Watchlist';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {AbstractPage} from '../AbstractPage';
import {IButton} from '../../button/IButton';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['../page.component.css']
})
export class Page2Component extends AbstractPage implements OnInit {
  static this: any;
  constructor(protected sortService: SortService, protected apiToolService: APIToolService, protected dialog: MatDialog) {
    super(sortService, apiToolService, dialog);
    Page2Component.this = this;
  }
  async ngOnInit() {
    super.handleResponsive(window);
    await this.loadRawMovies(this.defaultMovieInterval);
    await this.sortService.setTrueToSortedParametersChanged(await this.getId());
    await this.sortService.setTrueToRawDataMovies(await this.getId());
  }
  async update(sortService: SortService) {
    super.updateAbstract(sortService, Page2Component.this);
  }
  getId(): number {
    return 2;
  }
  async getDataToPrint(movie: Movie) {
    const data = await super.getDataToPrint(movie);
    const rate = 'Rate:' + await movie.getRate();
    data.data['rate'] = rate;
    return data;
  }
  async loadRawMovies(interval: ParamInterval) {
    super.handleResponsive(window);
    const connectedUser = await (await this.apiToolService.getUserService()).getConnectedUser();
    const watchlist: Watchlist = await connectedUser.getWatchlist();
    const movies = await(await this.apiToolService.getMovieService()).getMoviesByIds(await watchlist.getMoviesIds(),
    interval);
    await this.sortService.setRawMovies(await this.getId(), movies);
  }
  async clickOnAddToWatchlist(b: IButton) {
    super.clickOnAddToWatchlistAbstract(b, Page2Component.this);
  }
}
