import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TextCompareComponent } from './pages/text-compare/text-compare.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginGuard } from './login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const ANGULAR_MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TextCompareComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...ANGULAR_MAT_MODULES,
  ],
  providers: [LoginGuard, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
