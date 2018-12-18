import { Component, OnInit, Input } from '@angular/core';
import {SortService} from '../../../services/SortService';
import {AbstractSortBar} from '../AbstractSortBar';
import { Movie } from '../../../services/objects/Movie';
import { IParam } from '../../../services/objects/sortParameters/IParam';
import { ParamGenre } from '../../../services/objects/sortParameters/ParamGenre';

@Component({
  selector: 'app-sort-bar-page3',
  templateUrl: './sort-bar-page3.component.html',
  styleUrls: ['./sort-bar-page3.component.css']
})
export class SortBarPage3Component extends AbstractSortBar implements OnInit {
  static this: any;
  constructor(protected sortService: SortService) {
    super(sortService);
    SortBarPage3Component.this = this;
    this.sortService.addObserversHandlers(this.handlerUpdate);
  }
  async handlerUpdate(sortService: SortService) {
    await SortBarPage3Component.this.update(SortBarPage3Component.this.getId(), sortService);
  }

  async ngOnInit() {
  }
  getId(): number {
    return 3;
  }
  async onChangeGenres(objectsFromSelect) {
    // c'est un handler commun à toutes les barres
    await SortBarPage3Component.this.onChangeGeneral(objectsFromSelect, async (value) => await new ParamGenre(value));
  }
}
