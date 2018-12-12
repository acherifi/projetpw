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
  categories: String[];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'clap',
        sanitizer.bypassSecurityTrustResourceUrl(this.iconPath));
  }

  ngOnInit() {
  }
}
