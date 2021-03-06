import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {

}
