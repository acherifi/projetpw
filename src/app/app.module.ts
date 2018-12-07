import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material/';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviecardComponent } from './moviecard/moviecard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviecardComponent,
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
    TextFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
