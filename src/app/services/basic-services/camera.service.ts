import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CameraVM, CameraCM, CameraUM } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  apiPaths = environment.apiLink;
  constructor(private http: HttpClient) { }

  public getAll(): Promise<CameraVM[]> {
    return this.http.get<CameraVM[]>(`${this.apiPaths.endPoint}${this.apiPaths.camera.main}`)
      .toPromise();
  }

  public getById(id: string): Promise<CameraVM> {
    return this.http.get<CameraVM>(`${this.apiPaths.endPoint}${this.apiPaths.camera.getById}${id}`)
      .toPromise();
  }

  public insert(data: CameraCM): Promise<CameraVM> {
    return this.http.post<CameraVM>(`${this.apiPaths.endPoint}${this.apiPaths.camera.main}`, data)
      .toPromise();
  }

  public update(data: CameraUM): Promise<CameraVM> {
    return this.http.put<CameraVM>(`${this.apiPaths.endPoint}${this.apiPaths.camera.main}`, data)
      .toPromise();
  }

  public delete(id: string): Promise<any> {
    return this.http.delete<any>(`${this.apiPaths.endPoint}${this.apiPaths.camera.getById}${id}`)
      .toPromise();
  }

}
