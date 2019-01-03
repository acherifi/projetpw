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
  /*
  async tempoTestAPI() {

    await console.log('test userService (don\'t forget to clean the database)');
    const userService = await new UserService();
    await console.log('test add');
    let resAdd = await userService.addUser(await new User('test@gmail.com', 'ah'));
    await console.log('expect true : ' + resAdd);
    resAdd = await userService.addUser(await new User('test@gmail.com', 'ah'));
    await console.log('expect false : ' + resAdd);

    const users = await userService.getAllUsers();
    await console.log('nbUsers: ' + users.length);
    await users.forEach(async u => await console.log(await u.toString()));
    const user = await userService.getUserByMail('test@gmail.com');
    await console.log('user: ' + await user.toString());
    const falseUser = await userService.getUserByMail('ah@gmail.com');

    await console.log('test watchlist: ');
    const watchlistService = await new WatchlistService();
    await console.log('add to watchlist:');
    await watchlistService.addMovieToWatchlist(await user.getWatchlist(), '42');
    let userFromAPI = await userService.getUserByMail('test@gmail.com');
    await console.log('from api: ' + await userFromAPI.toString());
    await console.log('remove from watchlist:');
    await watchlistService.removeMovieFromWatchlist(await user.getWatchlist(), '42');
    userFromAPI = await userService.getUserByMail('test@gmail.com');
    await console.log('from api: ' + await userFromAPI.toString());

  }
  */

}
