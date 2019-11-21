import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
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
