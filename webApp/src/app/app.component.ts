import { Component } from '@angular/core';
import { APIToolService } from '../services/APIToolService';
import { SortService} from '../services/SortService';
import Cards from './data.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cineweb';
  cards = new Cards().cards;
}
