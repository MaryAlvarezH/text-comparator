import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

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

  signUp(): void {}
}
