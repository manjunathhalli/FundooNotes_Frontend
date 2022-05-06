import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  RegisterForm!: FormGroup;
  hide = false;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{1,}$'), Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$'), Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}')]),
      confirm_password: new FormControl('', Validators.required)
    })

  }
  Register() {
    if (!this.RegisterForm.invalid) {
      this.userService.Register(this.RegisterForm.value).subscribe(
        (result: any) => {
          console.log(result);
          this.snackBar.open(result.message, '', { duration: 2500 });
          (result.status == true); {
            this.router.navigateByUrl('/login');
          }
        },
      );
    }
  }
}
