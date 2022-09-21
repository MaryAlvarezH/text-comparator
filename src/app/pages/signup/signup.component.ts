import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ReqStatus } from 'src/app/tools/types/global';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  reqStatus: ReqStatus = ReqStatus.initial;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      validatePassword: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
    });
  }

  signUp(): void {
    this.reqStatus = 1;
    if (this.form.valid) {
      const newUser: User = {
        name: this.form.controls['name'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      };
      this.userService.signUp(newUser).subscribe(
        () => {
          this.reqStatus = 2;
        },
        (error) => {
          console.error(`[signup.component]: ${error}`);
          this.reqStatus = 3;
        }
      );
    }
  }
}
