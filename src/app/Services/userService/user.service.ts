import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

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

  Login(data:any){
    const params = {
      email: data.email,
      password:data.password
    }
    return this.httpService.post(`${environment.baseUrl}/auth/login`,params);
  }
}
