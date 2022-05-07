import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  user = localStorage.getItem('FundooUser')
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('FundooUser')
  }

  CreateNote(data: any) {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    let params = {
      title: data.title,
      description: data.description,
    };

    let headers = {
      headers: new HttpHeaders({
        title: data.title,
        description: data.description,
        'Content-Type': 'multipart/form-data',
        'Authorization': this.token

      })
    }
    return this.httpService.post(`${environment.baseUrl}/auth/createNotes`, params);
  }
}

