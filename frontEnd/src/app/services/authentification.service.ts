import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, Subject, tap} from 'rxjs';
import {Credentials} from "../../../types";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";


export const TOKEN_KEY = 'auth-token';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    public user: Subject<string> = new BehaviorSubject<string>("");

    constructor(private http: HttpClient, private router: Router) {
    }

    getUser() {
        return jwtDecode(this.getToken())
    }

    verification(credentials: Credentials): Observable<any> {
        return this.http.post('http://localhost:8888/users/login',
            JSON.stringify(credentials), httpOptions).pipe(
            shareReplay(1),
            tap(res => {
                this.saveToken(res);
            }));
    }

    saveToken(token: any) {

        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token.token));
    }


    public isTokenExpired() {
        let token = <string>this.getToken();
        if (token) {
            const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return false
    }

    getToken() {

        let token = window.localStorage.getItem(TOKEN_KEY);
        return token ? JSON.parse(token) : null;

    }

    signOut() {
        window.localStorage.removeItem(TOKEN_KEY);
        this.router.navigateByUrl("/");
    }

    isLoggedIn() {
        return this.getToken() === null;
    }
}
