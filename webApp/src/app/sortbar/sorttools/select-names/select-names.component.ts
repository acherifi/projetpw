import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-names',
  templateUrl: './select-names.component.html',
  styleUrls: ['./select-names.component.css']
})
export class SelectNamesComponent implements OnInit {
  @Input() handlerChange;
  @Input() data: string[];
  saveLastObjectSelected = null;
  constructor() { }

  ngOnInit() {
  }
  async onClick(objectClicked, device) {
    if (this.saveLastObjectSelected !== null && this.saveLastObjectSelected.value === objectClicked.value && objectClicked.selected) {
      objectClicked.selected = false;
      this.saveLastObjectSelected = null;
      await this.handlerChange(device);
    }
    if (objectClicked.selected) {
      this.saveLastObjectSelected = objectClicked;
    }
  }

}
