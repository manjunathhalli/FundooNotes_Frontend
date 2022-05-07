import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl} from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   
  }

  Login() {
    if (!this.LoginForm.invalid) {
      this.userService.Login(this.LoginForm.value).subscribe(
        (result: any) => {
          console.log(result);
          //localStorage.setItem("token",result.access_token)
          this.snackBar.open(result.message, '', { duration: 2500 });
          (result.status == true); {
            this.LocalStorage(result.access_token, 'FundooUser');
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open('UnAuthorized','', { duration: 30000 });
        }
      );
    }
  }
  LocalStorage(data: any, name: any) {
    var user = localStorage.getItem(name);
    if (user != null) {
      localStorage.removeItem(name);
    }
    user = data;
    localStorage.setItem(name, JSON.stringify(user));
  }
  checkLocalStorage() {
    var user = localStorage.getItem('FundooUser');
    if (user != null) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
