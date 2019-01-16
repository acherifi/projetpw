import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService} from '../../services/UserService';
import {WatchlistService} from '../../services/WatchlistService';
import {User} from '../../services/objects/User';
import {APIToolService} from '../../services/APIToolService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconPath = 'assets/clap.svg';
  buttons: String[] = ['Log out'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private apiToolService: APIToolService,
    private location: Location, private router: Router) {
    iconRegistry.addSvgIcon('clap', sanitizer.bypassSecurityTrustResourceUrl(this.iconPath));
  }

  async ngOnInit() {
  }
  /**
   * Handler called when user click on "log out" button
   */
  async disconnectHandler() {
    await (await this.apiToolService.getUserService()).setConnectedUser(undefined);
    this.router.navigateByUrl('', {skipLocationChange: true});
    this.location.replaceState('');
  }

}
