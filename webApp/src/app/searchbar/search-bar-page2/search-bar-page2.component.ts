import { Component, OnInit, Input } from '@angular/core';
import {SearchParametersService} from '../../../services/SearchParametersService';
import {AbstractSearchBar} from '../AbstractSearchBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/searchParameters/IParam';

@Component({
  selector: 'app-search-bar-page2',
  templateUrl: './search-bar-page2.component.html',
  styleUrls: ['./search-bar-page2.component.css']
})
export class SearchBarPage2Component extends AbstractSearchBar implements OnInit {

  update(movies: Movie[]) {
    //TODO
  }
  addParamToService(param: IParam) {
    //TODO
  }

  constructor(private searchParametersService:SearchParametersService) {
    super();
  }

  ngOnInit() {
  }

}
