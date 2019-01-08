import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { APIToolService } from '../services/APIToolService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cineweb';
  constructor(private apiToolService: APIToolService, private location: Location, private router: Router) {
  }
  async ngOnInit() {
    if (await (await this.apiToolService.getUserService()).getConnectedUser() === undefined) {
      this.router.navigateByUrl('', {skipLocationChange: true});
      this.location.replaceState('');
    }
  }

}
