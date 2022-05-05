import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  hide = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^.,:;!@#$%^&*_+=|(){}\/\\[?-]*[.,:;!@#$%^&*_+=|(){}\/\\[?-][^.,:;!@#$%^&*_+=|(){}\/\\[?-]*$).{8,}$')])
    })
  }
  Login(){
    if(!this.LoginForm.invalid){
      this.userService.Login(this.LoginForm.value)
      .subscribe((result: any) => {
        console.log(result);
        if (result.status == true) {
            this.snackBar.open(result.message,'',{duration:2500});
          }
      },(error: HttpErrorResponse) => {
        if(error.error.message == "Login Failed ,Invalid Credentials !"){
        this.snackBar.open(error.error.message,'',{duration:2500});
        }
        else{
          this.snackBar.open(error.error.message,'',{duration:2500});
        }
      });
    }
  }

}
