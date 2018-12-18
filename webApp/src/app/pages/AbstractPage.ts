import { MatDialog, PageEvent } from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import { Movie } from '../../services/objects/Movie';
import {SortService} from '../../services/SortService';
import {ParamInterval} from '../../services/objects/sortParameters/ParamInterval';
import {APIToolService} from '../../services/APIToolService';

export abstract class AbstractPage {
  breakpoint = 6;
  loading = true;
  movies: Movie[] = null;
  protected defaultMovieInterval: ParamInterval = new ParamInterval('[0, 10[');
  constructor(protected sortService: SortService, protected apiToolService: APIToolService,  protected dialog: MatDialog) {
    this.sortService.addObserversHandlers(this.update);
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
  onResize(event: any) {
    this.handleResponsive(event.target);
  }
  abstract async update(sortService: SortService);
  abstract async loadRawMovies(interval: ParamInterval);
  async onPaginateChange(event: PageEvent) {
    this.loading = true;
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize - 1;
    await this.loadRawMovies(await new
      ParamInterval(`[${start}, ${end}]`));
  }
  async onClickMe(index: number) {
    const dialogRef = this.dialog.open(MovieDialogComponent,
       await this.getDataToPrint(this.movies[index])
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  abstract getId(): number;
  async getDataToPrint(movie: Movie) {
    const data = { data: {
      name: movie.getTitle(),
      synopsis: movie.getSynopsis(),
      poster: movie.getPosterLink(),
      releasedate: movie.getReleaseDate().toDateString()
    }};
    return data;
  }
  async updateAbstract(sortService: SortService, page: AbstractPage) {
    if (await sortService.sortedMoviesHasChanged(await page.getId())) {
      page.movies = await sortService.getSortedMovies(await page.getId());
      page.loading = false;
    }
  }
}
