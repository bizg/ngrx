import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/app-state/entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class AppService {

  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  login(user: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers };
    return this.http.post(environment.loginUrl, {user}, options).pipe(
      map((response: any) => response),
      catchError(err => {
        console.log(err);
        return of([]);
      })
    );
  }

  singup(user: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers };
    return this.http.post(environment.singupUrl, {user}, options).pipe(
      map((response: any) => response),
      catchError(err => {
        console.log(err);
        return of([]);
      })
    );
  }

}
