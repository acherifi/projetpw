import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-names',
  templateUrl: './select-names.component.html',
  styleUrls: ['./select-names.component.css']
})
export class SelectNamesComponent implements OnInit {
  @Input() handlerChange;
  @Input() data:string[];
  constructor() { }

  ngOnInit() {
  }

}
