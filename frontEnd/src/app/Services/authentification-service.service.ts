import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {
public user:Subject<string> = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) { }
  getUser(){return this.user;}
  connect(data:string){this.user.next(data);}
  disconnect(){this.user.next("");}
  verification(identifiants:any):Observable<any>{
    return this.http.post('http://localhost:8888/users/login',
    JSON.stringify(identifiants),httpOptions);
  }
}
