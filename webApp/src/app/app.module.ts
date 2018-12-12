import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule } from '@angular/material/';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieCardPage1Component } from './moviecards/moviecardpage1/moviecardpage1.component';
import { MovieCardPage2Component } from './moviecards/moviecardpage2/moviecardpage2.component';
import { MovieCardPage3Component } from './moviecards/moviecardpage3/moviecardpage3.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { SortBarPage1Component } from './sortbar/sort-bar-page1/sort-bar-page1.component';
import { SortBarPage2Component } from './sortbar/sort-bar-page2/sort-bar-page2.component';
import { SortBarPage3Component } from './sortbar/sort-bar-page3/sort-bar-page3.component';
import { SelectNamesComponent } from './sortbar/sorttools/select-names/select-names.component';
import { SelectNumbersComponent } from './sortbar/sorttools/select-numbers/select-numbers.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';

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
