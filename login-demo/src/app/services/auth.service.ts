import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'my-website-api/login';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    // return this.http.post('api/login', credentials);

    const successfulResponse = { success: true, message: 'Login error', user: { id: 1, name: 'Jeff' } }
    return of(successfulResponse);
  }
}
