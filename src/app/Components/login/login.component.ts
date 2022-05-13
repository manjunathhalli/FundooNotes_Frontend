import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9]{3,}([._+-][a-zA-Z0-9]{1,})?@[a-zA-Z0-9]{1,10}[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3})?$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&%$#@?^*!~]).{8,}$")]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      let reqData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.userService.Login(reqData).subscribe((response: any) => {
        console.log("Login successful", response);
        localStorage.setItem("FundooUser", response.access_token);
        this.router.navigateByUrl('/dashboard')

        this._snackBar.open('Login in successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom',     
        })
      });
    }
    else {
        this._snackBar.open('Invalid Credentails', '', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }

  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  ShowPassword() {
    this.hide = !this.hide;
  }
}