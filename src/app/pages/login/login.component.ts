import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ReqStatus } from 'src/app/tools/types/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  reqStatus: ReqStatus = ReqStatus.initial;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    const islogged = this.userService.isLoggedIn();

    if (islogged) {
      this.router.navigate(['/compare']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
    });
  }

  logIn(): void {
    this.reqStatus = 1;
    if (this.form.valid) {
      const credentials: Credentials = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      };
      this.userService.logIn(credentials).subscribe(
        () => {
          this.reqStatus = 2;
          this.router.navigate(['/compare']);
        },
        (error) => {
          console.error(`[login.component]: ${error}`);
          this.reqStatus = 3;
        }
      );
    }
  }
}
