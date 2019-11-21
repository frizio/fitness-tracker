import { UiService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  initAuthListener() {
    this.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/training']);
          } else {
            this.trainingService.cancelSubscriptions();
            this.isAuthenticated = false;
            this.authChange.next(false);
            this.router.navigate(['/login']);
          }
        }
      );
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          // console.log(result);
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar('Registration successfully', null, 3000);
        }
      )
      .catch(
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar(error.message, null, 3000);
        }
      );
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          // console.log(result);
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar('Login successfully', null, 3000);
        }
      )
      .catch(
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar(error.message, null, 3000);
        }
      );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
