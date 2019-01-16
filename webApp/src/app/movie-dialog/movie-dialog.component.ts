import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IButton } from '../button/IButton';


export interface DialogData {
  name: String;
  synopsis: String;
  buttons: IButton[];
  poster: String;
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent implements OnInit {
  @Input() buttons: IButton[];
  infos: string[];
  keys: string[];

  constructor(public dialogRef: MatDialogRef<MovieDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  async ngOnInit() {
    this.buttons = this.data.buttons;
    this.keys = Object.keys(this.data);
    this.keys = this.keys.filter(x => x !== 'poster' && x !== 'buttons' && x !== 'id');
  }

}
