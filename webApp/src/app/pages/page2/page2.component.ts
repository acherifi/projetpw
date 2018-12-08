import { Component, OnInit } from '@angular/core';
import {APIToolService} from '../../../services/APIToolService';
import {SearchParametersService} from '../../../services/SearchParametersService';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(private apiToolService: APIToolService, private searchParametersService: SearchParametersService) { }

  ngOnInit() {
  }

}
