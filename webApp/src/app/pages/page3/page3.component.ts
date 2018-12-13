import { Component, OnInit } from '@angular/core';
import {APIToolService} from '../../../services/APIToolService';
import {SortService} from '../../../services/SortService';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  constructor(private apiToolService: APIToolService, private sortService: SortService) { }

  ngOnInit() {
  }

}
