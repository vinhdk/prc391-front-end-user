import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleVM, RoleCM, RoleUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<RoleVM[]> {
    return this.http.get<RoleVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.role.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<RoleVM> {
    return this.http.get<RoleVM>(`${this.apiPaths.endPoint}${this.apiPaths.role.getById}${id}`)
      .toPromise();
  }

  public insert(data: RoleCM): Promise<RoleVM> {
    return this.http.post<RoleVM>(`${this.apiPaths.endPoint}${this.apiPaths.role.main}`, data)
      .toPromise();
  }

  public update(data: RoleUM): Promise<RoleVM> {
    return this.http.put<RoleVM>(`${this.apiPaths.endPoint}${this.apiPaths.role.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.role.getById}${id}`)
      .toPromise();
  }

}
