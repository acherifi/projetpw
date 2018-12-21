import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { APIToolService } from 'src/services/APIToolService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nameConnection = 'Connection';
  nameCreateAccount = 'Create Account';
  constructor(private apiToolService: APIToolService, private location: Location, private router: Router) {  }

  async ngOnInit() {
    if (await (await this.apiToolService.getUserService()).getConnectedUser() !== undefined) {
      this.router.navigateByUrl('app', {skipLocationChange: true});
    }
  }

}
