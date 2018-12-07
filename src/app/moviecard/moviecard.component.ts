import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})

export class MoviecardComponent implements OnInit {

  constructor() {

  }

  @Input() data: any;

  ngOnInit() {
  }

}
