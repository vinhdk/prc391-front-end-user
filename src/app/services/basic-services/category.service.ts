import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryVM, CategoryCM, CategoryUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<CategoryVM[]> {
    return this.http.get<CategoryVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.category.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<CategoryVM> {
    return this.http.get<CategoryVM>(`${this.apiPaths.endPoint}${this.apiPaths.category.getById}${id}`)
      .toPromise();
  }

  public insert(data: CategoryCM): Promise<CategoryVM> {
    return this.http.post<CategoryVM>(`${this.apiPaths.endPoint}${this.apiPaths.category.main}`, data)
      .toPromise();
  }

  public update(data: CategoryUM): Promise<CategoryVM> {
    return this.http.put<CategoryVM>(`${this.apiPaths.endPoint}${this.apiPaths.category.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.category.getById}${id}`)
      .toPromise();
  }

}
