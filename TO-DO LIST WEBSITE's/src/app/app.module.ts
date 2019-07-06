import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import { AppRoutingModule,rountingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginSignupComponent } from './user-management/login-signup/login-signup.component';
import { DisplaytaskComponent } from './task-management/displaytask/displaytask.component';
import { AuthInterceptor } from "./user-management/login-signup/auth-interceptor";
import {
  MatInputModule,
} from "@angular/material";
import {ValidateService} from './services/validate.service'
import { NgFlashMessagesModule } from 'ng-flash-messages';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EdittaskComponent } from './task-management/edittask/edittask.component';
import { HeadComponent } from './head/head.component';
@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    LoginSignupComponent,
    rountingComponent,
    DisplaytaskComponent,
    EdittaskComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    NgFlashMessagesModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
