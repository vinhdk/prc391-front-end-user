import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderVM, OrderCM, OrderUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<OrderVM[]> {
    return this.http.get<OrderVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.order.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<OrderVM> {
    return this.http.get<OrderVM>(`${this.apiPaths.endPoint}${this.apiPaths.order.getById}${id}`)
      .toPromise();
  }

  public insert(data: OrderCM): Promise<OrderVM> {
    return this.http.post<OrderVM>(`${this.apiPaths.endPoint}${this.apiPaths.order.main}`, data)
      .toPromise();
  }

  public update(data: OrderUM): Promise<OrderVM> {
    return this.http.put<OrderVM>(`${this.apiPaths.endPoint}${this.apiPaths.order.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.order.getById}${id}`)
      .toPromise();
  }

}
