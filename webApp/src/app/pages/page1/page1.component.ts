import { Component, OnInit } from '@angular/core';
import {APIToolService} from '../../../services/APIToolService';
import {SortService} from '../../../services/SortService';
import {MovieService} from '../../../services/MovieService';
import {Movie} from '../../../services/objects/Movie';
import {ParamInterval} from '../../../services/objects/sortParameters/ParamInterval';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  static this;
  constructor(protected sortService: SortService, protected movieService: MovieService) {
    Page1Component.this = this;
    this.sortService.addObserversHandlers(this.update);
  }

  async ngOnInit() {
    const recentMovies = await this.movieService.getRecentMovies(await new ParamInterval('[0, 10]'));
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
  async update(sortService: SortService) {
    if (await sortService.sortedMoviesHasChanged(await Page1Component.this.getId())) {
      await Page1Component.this.fillPage(await sortService.getSortedMovies(Page1Component.this.getId()));
    }
  }
  async fillPage(movies: Movie[]) {
    await console.log('je remplis la page');
  }
  getId(): number {
    return 1;
  }

}
