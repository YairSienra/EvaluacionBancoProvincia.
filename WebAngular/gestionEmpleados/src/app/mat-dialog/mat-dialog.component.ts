import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit, } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogService } from '../grid-empleados/grid-empleados.component';
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public Data : boolean) { }



  ngOnInit() {
  }
 openDialog() {
  this.dialog.open(MatDialogComponent, {
    width:'250px',
    data: true
  })


 }


}
