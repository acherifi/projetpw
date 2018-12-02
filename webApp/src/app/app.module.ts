import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material/';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieCardPage1Component } from './moviecards/moviecardpage1/moviecardpage1.component';
import { MovieCardPage2Component } from './moviecards/moviecardpage2/moviecardpage2.component';
import { MovieCardPage3Component } from './moviecards/moviecardpage3/moviecardpage3.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { SearchBarPage1Component } from './searchbar/search-bar-page1/search-bar-page1.component';
import { SearchBarPage2Component } from './searchbar/search-bar-page2/search-bar-page2.component';
import { SearchBarPage3Component } from './searchbar/search-bar-page3/search-bar-page3.component';
import { SelectNamesComponent } from './searchbar/searchtools/select-names/select-names.component';
import { SelectNumbersComponent } from './searchbar/searchtools/select-numbers/select-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieCardPage1Component,
    MovieCardPage2Component,
    MovieCardPage3Component,
    Page1Component,
    Page2Component,
    Page3Component,
    SearchBarPage1Component,
    SearchBarPage2Component,
    SearchBarPage3Component,
    SelectNamesComponent,
    SelectNumbersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
