import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = localStorage.getItem('FundooUser')
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('FundooUser')
  }
  Register(data: any) {
    const params = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password

    }
    return this.httpService.post(`${environment.baseUrl}/auth/register`, params);
  }

  Login(data: any) {
    const params = {
      email: data.email,
      password: data.password
    }
    return this.httpService.post(`${environment.baseUrl}/auth/login`, params);
  }

  Forgot(data: any) {
    return this.httpService.post(
      `${environment.baseUrl}/auth/forgotpassword?email=${data.email}`
    );
  }

  Reset(email: string, data: any) {
    let params = {
      email: email,
      password: data.password
    }
    return this.httpService.put(`${environment.baseUrl}/auth/resetpassword`, params);
  }
}
