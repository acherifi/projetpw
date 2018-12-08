import { Component, OnInit } from '@angular/core';
import {AbstractMovieCard} from '../AbstractMovieCard';

@Component({
  selector: 'app-moviecardpage2',
  templateUrl: './moviecardpage2.component.html',
  styleUrls: ['./moviecardpage2.component.css']
})
export class MovieCardPage2Component extends AbstractMovieCard implements OnInit {

  dataButton: string[];
  ngOnInit() {
  }

}
