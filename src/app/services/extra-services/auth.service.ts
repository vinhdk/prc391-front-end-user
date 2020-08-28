import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token, AccountVM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public readonly touchToken = (): Promise<AccountVM> => {
    return this.http.get<AccountVM>(`${this.apiPaths.endPoint}${this.apiPaths.auth.main}`).toPromise();
  }
  public readonly login = (data: {Username: string; Password: string}): Promise<Token> => {
    return this.http.post<Token>(`${this.apiPaths.endPoint}${this.apiPaths.auth.token}`, data).toPromise();
  }
  public readonly register = (data: {Username: string, Password: string, Fullname: string, Phone: string, Email: string}): Promise<Token> => {
    return this.http.post<Token>(`${this.apiPaths.endPoint}${this.apiPaths.auth.main}`, data).toPromise();
  }
  public readonly update = (data: {Fullname: string, Phone: string, Email: string}): Promise<any> => {
    return this.http.put<any>(`${this.apiPaths.endPoint}${this.apiPaths.auth.main}`, data).toPromise();
  }
  public readonly changePassword = (data: {Password: string, OldPassword: string}): Promise<any> => {
    return this.http.put<any>(`${this.apiPaths.endPoint}${this.apiPaths.auth.password}`, data).toPromise();
  }
}
