import { Component, OnInit } from '@angular/core';
import {APIToolService} from '../../../services/APIToolService';
import {SearchParametersService} from '../../../services/SearchParametersService';
import { MovieService } from 'src/services/MovieService';
import { ParamInterval } from 'src/services/objects/searchParameters/ParamInterval';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  breakpoint = 6;
  movies = null;

  constructor() { }

  async ngOnInit() {
    this.handleResponsive(window);
    this.movies = await ((await new MovieService()).getRecentMovies(new ParamInterval('[0, 10]')));
  }

  onResize(event) {
    this.handleResponsive(event.target);
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
}
