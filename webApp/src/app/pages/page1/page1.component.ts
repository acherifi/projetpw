import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import {SortService} from '../../../services/SortService';
import {APIToolService} from '../../../services/APIToolService';
import {Movie} from '../../../services/objects/Movie';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {AbstractPage} from '../AbstractPage';

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
  }
  async update(sortService: SortService) {
    super.updateAbstract(sortService, Page1Component.this);
  }
  getId(): number {
    return 1;
  }

  async getDataToPrint(movie: Movie) {
    const data = await super.getDataToPrint(movie);
    let actors = 'Actors:';
    await movie.getActors().forEach(async actor => {
      actors += actor;
    });
    data.data['actors'] = actors;
    data.data['id'] = 'id' + await movie.getId();
    return data;
  }
  async loadRawMovies(interval: ParamInterval) {
    const recentMovies = await (await this.apiToolService.getMovieService()).getRecentMovies(interval);
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
}
