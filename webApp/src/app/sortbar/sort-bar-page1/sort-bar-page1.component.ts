import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/sortParameters/IParam';

@Component({
  selector: 'app-sort-bar-page1',
  templateUrl: './sort-bar-page1.component.html',
  styleUrls: ['./sort-bar-page1.component.css']
})
export class SortBarPage1Component extends AbstractSortBar implements OnInit {
  @Input() dataLastWeeks: string[];
  update(movies: Movie[]) {
    // TODO
  }
  addParamToService(param: IParam) {
    // TODO
  }
  onChangeWeeks(result) {
    // TODO handler du choix des semaines
  }
  constructor(private sortService: SortService) {
    super();
  }

  ngOnInit() {
  }

}
