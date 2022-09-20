import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TextCompareComponent } from './pages/text-compare/text-compare.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginGuard } from './login.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    TextCompareComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
