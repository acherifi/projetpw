import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/sortParameters/IParam';

@Component({
  selector: 'app-sort-bar-page2',
  templateUrl: './sort-bar-page2.component.html',
  styleUrls: ['./sort-bar-page2.component.css']
})
export class SortBarPage2Component extends AbstractSortBar implements OnInit {
  constructor(protected sortService: SortService) {
    super(sortService);
  }

  ngOnInit() {
  }
  getId(): number {
    return 2;
  }

}
