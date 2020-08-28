import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  constructor(protected readonly router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['core']);
    }, 1000);
  }

}
