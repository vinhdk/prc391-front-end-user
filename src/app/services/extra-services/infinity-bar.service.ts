import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfinityBarService {

  protected loaderSubject = new Subject<{ show }>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }
  show() {
    this.loaderSubject.next({ show: true });
  }
  hide() {
    this.loaderSubject.next({ show: false });
  }
}
