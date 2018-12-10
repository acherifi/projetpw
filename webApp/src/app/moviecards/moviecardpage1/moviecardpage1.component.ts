import { Component, OnInit, Input } from '@angular/core';
import {AbstractMovieCard} from '../AbstractMovieCard';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MovieDialogComponent } from 'src/app/movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-moviecardpage1',
  templateUrl: './moviecardpage1.component.html',
  styleUrls: ['./moviecardpage1.component.css']
})
export class MovieCardPage1Component extends AbstractMovieCard implements OnInit {

  breakpoint = 6;

  dataButtons: string[];
  @Input() data;
  name = 'bloup';
  animal = 'shiba';

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.handleResponsive(window);
  }

  onResize(event) {
    this.handleResponsive(event.target);
  }

  handleResponsive(event: any) {
    if (event.innerWidth <= 400) {
      this.breakpoint = 1;
      return;
    }
    if (event.innerWidth <= 800) {
      this.breakpoint = 3;
      return;
    }
    this.breakpoint = 6;
  }

  onClickMe() {
    const dialogRef = this.dialog.open(MovieDialogComponent, {
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
