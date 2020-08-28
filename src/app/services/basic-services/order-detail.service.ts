import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderDetailVM, OrderDetailCM, OrderDetailUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<OrderDetailVM[]> {
    return this.http.get<OrderDetailVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.orderDetail.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<OrderDetailVM> {
    return this.http.get<OrderDetailVM>(`${this.apiPaths.endPoint}${this.apiPaths.orderDetail.getById}${id}`)
      .toPromise();
  }

  public insert(data: OrderDetailCM): Promise<OrderDetailVM> {
    return this.http.post<OrderDetailVM>(`${this.apiPaths.endPoint}${this.apiPaths.orderDetail.main}`, data)
      .toPromise();
  }

  public update(data: OrderDetailUM): Promise<OrderDetailVM> {
    return this.http.put<OrderDetailVM>(`${this.apiPaths.endPoint}${this.apiPaths.orderDetail.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.orderDetail.getById}${id}`)
      .toPromise();
  }

}
