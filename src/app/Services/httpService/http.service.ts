import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient
  ) { }
  post(url : string,data : any=null, isHeaderRequired:any = false, headers:any = null){
    return this.http.post(url,data,isHeaderRequired && headers)
  }

  put(url : string,data : any=null, isHeaderRequired:any = false, headers = null){
    return this.http.put(url,data,isHeaderRequired && headers)
  }
}
