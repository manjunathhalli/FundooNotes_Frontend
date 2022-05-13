import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  incomingData = this.messageSource.asObservable();

  constructor() { }

  outgoingData(message: string) {
    console.log(message)
    this.messageSource.next(message)
  }
}
