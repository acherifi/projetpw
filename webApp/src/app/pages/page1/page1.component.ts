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
  constructor(protected sortService: SortService, protected movieService: MovieService, protected dialog: MatDialog) {
    super(sortService, movieService, dialog);
  }
  async ngOnInit() {
    super.handleResponsive(window);
    const recentMovies = await this.movieService.getRecentMovies(await new ParamInterval('[0, 10]'));
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
  getId(): number {
    return 1;
  }

  async getDataToPrint(movie: Movie) {
    const data = await super.getDataToPrint(movie);
    data.data['rate'] = 'rate:' + await movie.getRate();
    return data;
  }
}
