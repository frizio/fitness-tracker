import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  loadingSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onLogin(form: NgForm) {
    // console.log('Login user');
    // console.log(form);
    this.authService.login(
      {
        email: form.value.email,
        password: form.value.password
      }
    );

  }

}
