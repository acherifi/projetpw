import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule } from '@angular/material/';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { SearchBarPage1Component } from './searchbar/search-bar-page1/search-bar-page1.component';
import { SearchBarPage2Component } from './searchbar/search-bar-page2/search-bar-page2.component';
import { SearchBarPage3Component } from './searchbar/search-bar-page3/search-bar-page3.component';
import { SelectNamesComponent } from './searchbar/searchtools/select-names/select-names.component';
import { SelectNumbersComponent } from './searchbar/searchtools/select-numbers/select-numbers.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    SearchBarPage1Component,
    SearchBarPage2Component,
    SearchBarPage3Component,
    SelectNamesComponent,
    SelectNumbersComponent,
    MovieDialogComponent,
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
    MatGridListModule,
    MatDialogModule,
    MatTabsModule
  ],
  entryComponents: [
    MovieDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
