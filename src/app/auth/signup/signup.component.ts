import { UiService } from './../../shared/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public maxDate: Date;

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
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSignup(form: NgForm) {
    console.log('Signup user');
    console.log(form);
    this.authService.registerUser(
      {
        email: form.value.email,
        password: form.value.password
      }
    );
  }

}
