import { Component, OnInit } from '@angular/core';
import {AbstractMovieCard} from '../AbstractMovieCard';

@Component({
  selector: 'app-moviecardpage3',
  templateUrl: './moviecardpage3.component.html',
  styleUrls: ['./moviecardpage3.component.css']
})
export class MovieCardPage3Component extends AbstractMovieCard implements OnInit {

  dataButton:string[];
  ngOnInit() {
  }

}
