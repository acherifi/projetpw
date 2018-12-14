import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import {SortService} from '../../../services/SortService';
import {MovieService} from '../../../services/MovieService';
import {Movie} from '../../../services/objects/Movie';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';
import {AbstractPage} from '../AbstractPage';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component extends AbstractPage implements OnInit {
  static this: any;
  constructor(protected sortService: SortService, protected movieService: MovieService, protected dialog: MatDialog) {
    super(sortService, movieService, dialog);
    Page1Component.this = this;
  }
  async ngOnInit() {
    super.handleResponsive(window);
    const recentMovies = await this.movieService.getRecentMovies(await new ParamInterval('[0, 10]'));
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
  async update(sortService: SortService) {
    if (await sortService.sortedMoviesHasChanged(await Page1Component.this.getId())) {
      Page1Component.this.movies = await sortService.getSortedMovies(await Page1Component.this.getId());
      Page1Component.this.loading = false;
    }
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
    return data;
  }
}
