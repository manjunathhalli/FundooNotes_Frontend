import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  ForgotForm!: FormGroup;
  hide = true;


  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.ForgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  forgot() {
    if (!this.ForgotForm.invalid) {
      this.userService.Forgot(this.ForgotForm.value).subscribe(
        (result: any) => {
          this.snackBar.open(result.message, '', { duration: 2500 });
          if (result.status == true) {
            console.log(result);
            this.router.navigateByUrl('/login');
          }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open( 'Email not Exists ! Please Register ! ', '', { duration: 2500 });{
            this.router.navigateByUrl('/register');
          }
        }
      );
    }
  }
  LocalStorage(data: any) {
    var reset = localStorage.getItem('Reset');
    if (reset != null) {
      localStorage.removeItem('Reset');
    }
    reset = data;
    localStorage.setItem('Reset', JSON.stringify(reset));
  }
}
