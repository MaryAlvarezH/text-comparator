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
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { ComparisonHistoryTableComponent } from './components/comparison-history-table/comparison-history-table.component';

const ANGULAR_MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TextCompareComponent,
    NavbarComponent,
    ComparisonHistoryTableComponent,
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
  providers: [
    LoginGuard,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
