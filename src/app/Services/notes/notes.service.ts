import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  token: any;

  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('FundooUser');
  }

  createNote(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postService('/auth/createNotes', reqData, true, header);
  }

  getAllNotes() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.getService('/auth/displayNotes', true, header)

  }

  updateNote(data: any, id: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    return this.httpService.postService('/auth/updateNoteById', data, true, header);
  }

  archiveNotes(id: any) {
    //console.log(id)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ` + this.token
      })

    }
    return this.httpService.putService("/auth/archiveNoteById", { id }, true, header)
  }

  pinNote(id: any) {
    // console.log(id)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ` + this.token
      })
    }
    return this.httpService.putService("/auth/pinNoteById", { id }, true, header)
  }

  deleteNotes(id: any) {
    //console.log(id)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ` + this.token
      }),
      body: { id: id }
    }
    return this.httpService.deleteService("/auth/deleteNoteById", true, header)
  }

  ColorNote(id: any, data: any) {
    // console.log(id,data.colour)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ` + this.token
      })
    }
    return this.httpService.putService("/auth/colourNoteById", { id, colour: data.colour }, true, header)
  }
}


