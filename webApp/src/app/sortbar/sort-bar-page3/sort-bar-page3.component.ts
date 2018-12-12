import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/sortParameters/IParam';

@Component({
  selector: 'app-sort-bar-page3',
  templateUrl: './sort-bar-page3.component.html',
  styleUrls: ['./sort-bar-page3.component.css']
})
export class SortBarPage3Component extends AbstractSortBar implements OnInit {

  update(movies: Movie[]) {
    // TODO
  }
  addParamToService(param: IParam) {
    // TODO
  }

  constructor(private sortService: SortService) {
    super();
  }

  ngOnInit() {
  }

}
