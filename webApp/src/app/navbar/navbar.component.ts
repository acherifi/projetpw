import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../../services/MovieService';
import { ParamLatitude} from '../../services/objects/searchParameters/ParamLatitude';
import { ParamLongitude} from '../../services/objects/searchParameters/ParamLongitude';
import { ParamRadius} from '../../services/objects/searchParameters/ParamRadius';
import { ParamInterval} from '../../services/objects/searchParameters/ParamInterval';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  iconPath = 'assets/clap.svg';
  buttons: String[] = ['Connexion', 'Inscription'];
  tempoTest = null;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'clap',
        sanitizer.bypassSecurityTrustResourceUrl(this.iconPath));
  }

  ngOnInit() {
  }
  async tempoTestAPI() {
    if (this.tempoTest === null) {
      this.tempoTest = /*await ((await new MovieService()).
      getMovieByIdWithShowTimes(244560,[await new ParamLatitude('50'),
      await new ParamLongitude('2'), await new ParamRadius('100')]));*/
      await ((await new MovieService()).getRecentMovies(new ParamInterval('[0, 10]')));
      await console.log('AH: ');
      await this.tempoTest.forEach(async x => await console.log(await x.toString()));
    } else {
      await console.log(await this.tempoTest.toString());

    }
  }
}
