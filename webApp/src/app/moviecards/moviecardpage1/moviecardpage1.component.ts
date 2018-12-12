import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {AbstractMovieCard} from '../AbstractMovieCard';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';
import { MovieService } from 'src/services/MovieService';
import { ParamInterval } from 'src/services/objects/searchParameters/ParamInterval';

@Component({
  selector: 'app-moviecardpage1',
  templateUrl: './moviecardpage1.component.html',
  styleUrls: ['./moviecardpage1.component.css']
})
export class MovieCardPage1Component extends AbstractMovieCard implements OnInit, OnChanges {

  dataButtons: string[];
  @Input() data;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  onClickMe() {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: {name: this.data[0].title, synopsis: this.data[0].synopsis}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.data = changes['data'].currentValue;
    console.log(this.data);
  }
}
