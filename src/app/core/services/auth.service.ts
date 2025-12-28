import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //  injection service http client to use four method back end get put post delete
  constructor(private readonly _HttpClient: HttpClient) {}

  //  register

  Register(RegisterFormInfo: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.base_Url}/api/auth/register`,
      RegisterFormInfo
    );
  }

  //  login
  Login(LoginFormInfo: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.base_Url}/api/auth/login`,
      LoginFormInfo
    );
  }
}
