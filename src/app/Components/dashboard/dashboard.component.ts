import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public sidenavText: boolean = true;

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signOut() {
    localStorage.removeItem("FundooUser");
    this.router.navigateByUrl('/login');

    this._snackBar.open('Sign out successful', '', {
      duration: 3000,
      verticalPosition: 'bottom',
    })
  }
}
