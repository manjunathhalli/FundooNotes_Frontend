import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/Services/dataService/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public sidenavText: boolean = true;

  constructor(private router: Router, private _snackBar: MatSnackBar, private data: DataService) { }

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

  search(event: any) {
    console.log(event.target.value)
    this.data.outgoingData(event.target.value)
  }

  reload(){
    window.location.reload()
  }
}
