import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountVM, AccountCM, AccountUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<AccountVM[]> {
    return this.http.get<AccountVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.account.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<AccountVM> {
    return this.http.get<AccountVM>(`${this.apiPaths.endPoint}${this.apiPaths.account.getById}${id}`)
      .toPromise();
  }

  public insert(data: AccountCM): Promise<AccountVM> {
    return this.http.post<AccountVM>(`${this.apiPaths.endPoint}${this.apiPaths.account.main}`, data)
      .toPromise();
  }

  public update(data: AccountUM): Promise<AccountVM> {
    return this.http.put<AccountVM>(`${this.apiPaths.endPoint}${this.apiPaths.account.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.account.getById}${id}`)
      .toPromise();
  }

}
