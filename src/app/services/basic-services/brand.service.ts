import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrandVM, BrandCM, BrandUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<BrandVM[]> {
    return this.http.get<BrandVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.brand.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<BrandVM> {
    return this.http.get<BrandVM>(`${this.apiPaths.endPoint}${this.apiPaths.brand.getById}${id}`)
      .toPromise();
  }

  public insert(data: BrandCM): Promise<BrandVM> {
    return this.http.post<BrandVM>(`${this.apiPaths.endPoint}${this.apiPaths.brand.main}`, data)
      .toPromise();
  }

  public update(data: BrandUM): Promise<BrandVM> {
    return this.http.put<BrandVM>(`${this.apiPaths.endPoint}${this.apiPaths.brand.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.brand.getById}${id}`)
      .toPromise();
  }

}
