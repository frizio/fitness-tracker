import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged = new Subject<boolean>();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSnackBar(message, action, duration) {
    this.snackBar.open(
      message,
      action,
      {
        duration
      }
    );
  }

}
