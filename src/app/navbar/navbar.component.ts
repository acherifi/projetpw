import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  iconPath= 'assets/clap.svg';
  buttons: String[] = ['Connexion', 'Inscription'];
  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'clap',
        sanitizer.bypassSecurityTrustResourceUrl(this.iconPath));
  }

  ngOnInit() {
    
  }
}
