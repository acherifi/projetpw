import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { APIToolService } from 'src/services/APIToolService';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nameConnection = 'Connection';
  nameCreateAccount = 'Create Account';
  iconPath = 'assets/clap.svg';

  // tslint:disable-next-line:max-line-length
  constructor(private apiToolService: APIToolService, private location: Location, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('clap', sanitizer.bypassSecurityTrustResourceUrl(this.iconPath));
  }

  async ngOnInit() {
    if (await (await this.apiToolService.getUserService()).getConnectedUser() !== undefined) {
      this.router.navigateByUrl('app', {skipLocationChange: true});
    }
  }

}
