import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
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
  constructor(protected sortService: SortService, protected movieService: MovieService, private dialog: MatDialog) {
    Page1Component.this = this;
    this.sortService.addObserversHandlers(this.update);
  }

  breakpoint = 6;
  movies: Movie[] = null;

  onResize(event) {
    this.handleResponsive(event.target);
  }

  async ngOnInit() {
    this.handleResponsive(window);
    this.movies = await ((await new MovieService()).getRecentMovies(new ParamInterval('[0, 9]')));
    const recentMovies = await this.movieService.getRecentMovies(await new ParamInterval('[0, 10]'));
    await this.sortService.setRawMovies(await this.getId(), recentMovies);
  }
  async update(sortService: SortService) {
    if (await sortService.sortedMoviesHasChanged(await Page1Component.this.getId())) {
      Page1Component.this.movies = await sortService.getSortedMovies(Page1Component.this.getId());
    }
  }
  getId(): number {
    return 1;
  }

  handleResponsive(event: any) {
    this.breakpoint = 6;
    if (event.innerWidth <= 800) {
      this.breakpoint = 3;
    }
    if (event.innerWidth <= 400) {
      this.breakpoint = 1;
    }
  }

  onClickMe(index) {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: {
        name: this.movies[index].getTitle(),
        synopsis: this.movies[index].getSynopsis(),
        poster: this.movies[index].getPosterLink()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async onPaginateChange(event: PageEvent) {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize - 1;
    console.log(start, end);
    this.movies = await ((await new MovieService()).getRecentMovies(new ParamInterval(`[${start}, ${end}]`)));
    console.log(this.movies);

  }
}
