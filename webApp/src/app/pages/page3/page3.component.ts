import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import {APIToolService} from '../../../services/APIToolService';
import {SortService} from '../../../services/SortService';
import {AbstractPage} from '../AbstractPage';
import {Movie} from '../../../services/objects/Movie';
import {Theater} from '../../../services/objects/Theater';
import {Show} from '../../../services/objects/Show';
import {ParamLatitude} from '../../../services/objects/sortParameters/ParamLatitude';
import {ParamLongitude} from '../../../services/objects/sortParameters/ParamLongitude';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {IButton} from '../../button/IButton';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['../page.component.css']
})
export class Page3Component extends AbstractPage implements OnInit {
  static this: any;
  defaultCoordinate = [49.047808, -1.444621]; // Coutances
  saveCoordinates: number[];
  constructor(protected sortService: SortService, protected apiToolService: APIToolService, protected dialog: MatDialog) {
    super(sortService, apiToolService, dialog);
    Page3Component.this = this;
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.saveCoordinates = [position.coords.latitude, position.coords.longitude];
      }, async (error) => {
        console.log('error', error);
      }, {enableHighAccuracy: false, maximumAge: Infinity, timeout: 5000});
  }

  getGeoPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, {enableHighAccuracy: false, maximumAge: Infinity, timeout:
        5000});
    });
  }

  async ngOnInit() {
    super.handleResponsive(window);
    try {
      const position = await this.getGeoPosition();
      console.log(position);
    } catch (e) {
      console.log(e);
    }
    await this.loadRawMovies(this.defaultMovieInterval);
    await this.sortService.setTrueToRawDataMovies(await this.getId());
    await this.sortService.setTrueToSortedParametersChanged(await this.getId());
  }
  /**
   * In the design pattern Observer, this is notify(), called by SortService.
   * So check if movies from SortService has changed, and if they changed, we set movies from the page.
   */
  async update(sortService: SortService) {
    super.updateAbstract(sortService, Page3Component.this);
  }
  getId(): number {
    return 3;
  }
  async getDataToPrintOnMovieDialog(movie: Movie) {
    const data = await super.getDataToPrintOnMovieDialog(movie);
    let showTimes = 'Show times:' ;
    const theaters: Theater[] = await movie.getTheaters();
    for (let i = 0; i < theaters.length; ++i) {
      showTimes += await theaters[i].getCity() + ' : ' + await theaters[i].getName() + ':\n';
      const shows: Show[] = await theaters[i].getShows();
      for (let j = 0; j < shows.length; j++) {
        showTimes += await shows[j].toString();
      }
      showTimes += '\n';

    }
    data.data['showtime'] = showTimes;
    return data;
  }
  /**
   * Raw movies is unsorted movies (movies print on screen without sorting).
   * @param interval because we can't load an infinity of movies, we need a interval
   */
  async loadRawMovies(interval: ParamInterval) {
    const loadRawMoviesPrivate = (async (latitude, longitude) => {
      const moviesIds = await (await (await (await this.apiToolService.getUserService()).getConnectedUser())
      .getWatchlist()).getMoviesIds();
      const params = [await new ParamLatitude(latitude + ''), await new ParamLongitude(longitude + '')];
      const tempoMovies =  await (await this.apiToolService.getMovieService()).getMoviesByIdsWithShowTimes(moviesIds,
        interval, params);
      const movies = [];
      await tempoMovies.forEach(async movie => {
        if (await movie.getTheaters().length > 0) {
          await movies.push(movie);
        }
      });
      await this.sortService.setRawMovies(await this.getId(), movies);
    });
    if (this.saveCoordinates === undefined) {
      await loadRawMoviesPrivate(this.defaultCoordinate[0], this.defaultCoordinate[1]);
    } else {
        await loadRawMoviesPrivate(this.saveCoordinates[0], this.saveCoordinates[1]);
    }
  }

  async clickOnAddToWatchlist(b: IButton) {
    super.clickOnAddToWatchlistAbstract(b, Page3Component.this);
  }

}
