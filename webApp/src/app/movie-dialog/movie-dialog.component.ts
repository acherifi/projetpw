import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  name: String;
  synopsis: String;
}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent implements OnInit {
  infos: string[];
  keys: string[];

  constructor(public dialogRef: MatDialogRef<MovieDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  async ngOnInit() {
    this.keys = Object.keys(this.data);
    this.keys = this.keys.filter(x => x !== 'poster');
  }

}
