import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule, MatPaginatorModule, MatProgressBarModule, MatDialogModule, MatGridListModule } from '@angular/material/';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { SortBarPage1Component } from './sortbar/sort-bar-page1/sort-bar-page1.component';
import { SortBarPage2Component } from './sortbar/sort-bar-page2/sort-bar-page2.component';
import { SortBarPage3Component } from './sortbar/sort-bar-page3/sort-bar-page3.component';
import { SelectNamesComponent } from './sortbar/sorttools/select-names/select-names.component';
import { SelectNumbersComponent } from './sortbar/sorttools/select-numbers/select-numbers.component';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import { SortService} from '../services/SortService';
import {MovieService} from '../services/MovieService';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    SortBarPage1Component,
    SortBarPage2Component,
    SortBarPage3Component,
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
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  entryComponents: [
    MovieDialogComponent
  ],
  providers: [SortService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
