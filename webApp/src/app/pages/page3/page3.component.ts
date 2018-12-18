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


@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['../page.component.css']
})
export class Page3Component extends AbstractPage implements OnInit {
  static this: any;
  defaultCoordinate = [-1.444621, 49.047808]; // Coutances
  constructor(protected sortService: SortService, protected apiToolService: APIToolService, protected dialog: MatDialog) {
    super(sortService, apiToolService, dialog);
    Page3Component.this = this;
  }

  async ngOnInit() {
    super.handleResponsive(window);
    await this.loadRawMovies(this.defaultMovieInterval);
  }

  async update(sortService: SortService) {
    super.updateAbstract(sortService, Page3Component.this);
  }
  getId(): number {
    return 3;
  }
  async getDataToPrint(movie: Movie) {
    const data = await super.getDataToPrint(movie);
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
  async loadRawMovies(interval: ParamInterval) {
    /*Tempo*/
    const users = await (await this.apiToolService.getUserService()).getAllUsers();
    await (await this.apiToolService.getUserService()).setConnectedUser(users[0]);
    /*fin tempo*/
    const convertInterval = await interval.getArrayValue();
    const loadRawMovies = (async (latitude, longitude) => {
      await console.log('coord: ' + latitude + ' ; ' + longitude);
      const moviesIds = await (await (await (await this.apiToolService.getUserService()).getConnectedUser())
      .getWatchlist()).getMoviesIds();
      const params = [await new ParamLatitude(latitude + ''), await new ParamLongitude(longitude + '')];
      const movies =  await (await this.apiToolService.getMovieService()).getMoviesByIdsWithShowTimes(moviesIds,
        interval, params);
      await this.sortService.setRawMovies(await this.getId(), movies);
  });
  await navigator.geolocation.getCurrentPosition(async (position) => {
    await loadRawMovies(position.coords.latitude, position.coords.longitude);
  }, async (error) => {
    await loadRawMovies(this.defaultCoordinate[0], this.defaultCoordinate[1]);
  });
  }

}
