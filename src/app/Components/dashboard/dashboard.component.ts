import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Name = '';
  Email = '';
  isGrid = true;
  isSearch = false;
  isOption = 1;
  searchInp = "";
  expand =true;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.getFromLocalStorage()
  }
  getFromLocalStorage() {
    var user = JSON.parse(localStorage.getItem("FundooUser")!);
    this.Name = user.userName;
    this.Email = user.emailId;
  }
  Logout() {
    var user = JSON.parse(localStorage.getItem("FundooUser")!);
    if (user != null) {
      //localStorage.removeItem("token")
       localStorage.removeItem("FundooUser");
      this.route.navigateByUrl('/login');
    }
  }
  changeSearch(event: any) {
    console.log(event.target.value)
    return event.target.value;
  }
}
