import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class StopTrainingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
