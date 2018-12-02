import { Component, OnInit } from '@angular/core';
import {AbstractMovieCard} from '../AbstractMovieCard';

@Component({
  selector: 'app-moviecardpage1',
  templateUrl: './moviecardpage1.component.html',
  styleUrls: ['./moviecardpage1.component.css']
})
export class MovieCardPage1Component extends AbstractMovieCard implements OnInit {

  dataButtons:string[];
  ngOnInit() {
  }

}
