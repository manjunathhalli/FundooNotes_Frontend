import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/Services/userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

  token = '';
  hide = false;
  email='';
  ResetForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token += params.get('email')
    });
    this.ResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}')]),
      confirm: new FormControl('', Validators.required)
    });
  }
  Reset() {
    if (!this.ResetForm.invalid) {
      this.userService
        .Reset(this.email, this.ResetForm.value)
        .subscribe((result: any) => {
          this.snackBar.open(result.message, '', { duration: 2500 });
          if (result.status == true) {
            this.router.navigateByUrl('/login');
          }
        });
    }
 
    (error: HttpErrorResponse) => {
      if (error.error.message == 'Token Expired') {
        this.snackBar.open("Token Expired! Please send another request!",'');
      }
    };
  }
}
