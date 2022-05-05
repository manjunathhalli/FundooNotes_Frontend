import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService : HttpService) { }

  Register(data:any){
      const params = {
        FirstName: data.firstName,
        LastName: data.lastName,
        EmailId : data.email,
        Password: data.password
      }
      return this.httpService.post(`${environment.baseUrl}/api/register`,params);
  }
}
