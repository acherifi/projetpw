import { MatDialog, PageEvent } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import { Movie } from '../../services/objects/Movie';
import {SortService} from '../../services/SortService';
import {ParamInterval} from '../../services/objects/sortParameters/ParamInterval';
import {APIToolService} from '../../services/APIToolService';
import {ButtonMovieDialog} from '../button/ButtonMovieDialog';
import {User} from '../../services/objects/User';
import {IButton} from '../button/IButton';


export abstract class AbstractPage {
  breakpoint = 6;
  loading = true;
  movies: Movie[] = null;
  protected defaultMovieInterval: ParamInterval = new ParamInterval('[0, 10[');
  protected currentInterval: ParamInterval;
  constructor(protected sortService: SortService, protected apiToolService: APIToolService,  protected dialog: MatDialog) {
    this.sortService.addObserversHandlers(this.update);
    this.currentInterval = this.defaultMovieInterval;
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
    this.currentInterval = await new
    ParamInterval(`[${start}, ${end}]`);
    await this.loadRawMovies(this.currentInterval);
    await this.sortService.setTrueToSortedParametersChanged(await this.getId());
    await this.sortService.setTrueToRawDataMovies(await this.getId());
  }
  async onClickMovie(index: number) {
    const dialogRef = this.dialog.open(MovieDialogComponent,
       await this.getDataToPrintOnMovieDialog(this.movies[index]));
  }
  abstract getId(): number;
  async getDataToPrintOnMovieDialog(movie: Movie) {
    const data = { data: {
      name: movie.getTitle(),
      synopsis: movie.getSynopsis(),
      poster: movie.getPosterLink(),
      releasedate: movie.getReleaseDate().toDateString(),
    }};
    const user: User = await (await this.apiToolService.getUserService()).getConnectedUser();
    const moviesIds: String[] = await (await (await user.getWatchlist()).getMoviesIds());
    const idStringMovie: String = '' + await movie.getId();
    const isInWatchlist = await moviesIds.findIndex(s => s === idStringMovie) !== -1;

    const button = await new ButtonMovieDialog('Add to Watchlist', 'Remove from Watchlist', await movie.getId());
    if (isInWatchlist) {
      await button.swapName();
    }
    button.setHandlerClick(this.clickOnAddToWatchlist);
    data.data['buttons'] = await [button];
    return data;
  }
  /**
   * In the design pattern Observer, this is notify(), called by SortService.
   * So check if movies from SortService has changed, and if they changed, we set movies from the page.
   * @param page to know what page we need to update
   */
  async updateAbstract(sortService: SortService, page: AbstractPage) {
    if (await sortService.sortedMoviesHasChanged(await page.getId())) {
      page.movies = await sortService.getSortedMovies(await page.getId());
      page.loading = false;
    } else if (await sortService.rawMoviesHasChanged(await page.getId())) {
      // changed only with remove and add watchlist
      await page.loadRawMovies(page.currentInterval);
      page.movies = await sortService.getSortedMovies(await page.getId());
    }
  }
  async clickOnAddToWatchlistAbstract(b: IButton, page: AbstractPage) {
    const button =  <ButtonMovieDialog> b;
    const user: User = await (await page.apiToolService.getUserService()).getConnectedUser();
    const moviesIds: String[] = await (await (await user.getWatchlist()).getMoviesIds());
    const idStringMovie: String = '' + await button.getMovieId();
    const isInWatchlist = await moviesIds.findIndex(s => s === idStringMovie) !== -1;


    if (isInWatchlist) {
      await (await page.apiToolService.getWatchListService()).removeMovieFromWatchlist(await user.getWatchlist(), ''
      + await button.getMovieId());
    } else {
      await (await page.apiToolService.getWatchListService()).addMovieToWatchlist(await user.getWatchlist(), ''
      + await button.getMovieId());
    }
    await page.sortService.setTrueToAllRawDataMovies();
    await button.swapName();
    await console.log('click add to watchlist');
  }
  protected abstract async clickOnAddToWatchlist(b: IButton);
}
