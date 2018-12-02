import { Component, OnInit, Input } from '@angular/core';
import {SearchParametersService} from '../../../services/SearchParametersService';
import {AbstractSearchBar} from '../AbstractSearchBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/searchParameters/IParam';

@Component({
  selector: 'app-search-bar-page1',
  templateUrl: './search-bar-page1.component.html',
  styleUrls: ['./search-bar-page1.component.css']
})
export class SearchBarPage1Component extends AbstractSearchBar implements OnInit {
  @Input() dataLastWeeks:string[];
  update(movies: Movie[]) {
    //TODO
  }
  addParamToService(param: IParam) {
    //TODO
  }
  onChangeWeeks(result){
    //TODO handler du choix des semaines 
  }
  constructor(private searchParametersService:SearchParametersService) {
    super();
  }

  ngOnInit() {
  }

}
