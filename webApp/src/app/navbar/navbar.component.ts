import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../../services/MovieService';
import { ParamLatitude} from '../../services/objects/sortParameters/ParamLatitude';
import { ParamLongitude} from '../../services/objects/sortParameters/ParamLongitude';
import { ParamRadius} from '../../services/objects/sortParameters/ParamRadius';
import { ParamInterval} from '../../services/objects/sortParameters/ParamInterval';
import { SortService} from '../../services/SortService';
import {ParamDirector} from '../../services/objects/sortParameters/ParamDirector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  iconPath = 'assets/clap.svg';
  buttons: String[] = ['Connexion', 'Inscription'];
  tempoTest = null;
  categories: String[];

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
      // await console.log('AH: ');
      // await this.tempoTest.forEach(async x => await console.log(await x.toString()));
      const sort = await new SortService();
      await sort.addParam(1, await new ParamDirector('Alexandre Astier'));
      await sort.addObserversHandlers( async (origin: SortService) => {
        await console.log('handler !');
        const raw = await origin.getRawMovies(1);
        // await raw.forEach(async x => console.log(await x.toString()));
        const sortedMovies = await origin.getSortedMovies(1);
        await console.log('sorted movies :');
        await sortedMovies.forEach(async x => await console.log(await x.toString()));
      });
      await sort.setRawMovies(1, this.tempoTest);

    } else {
      await console.log(await this.tempoTest.toString());

    }
  }
}
