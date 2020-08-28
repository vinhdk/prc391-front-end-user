import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem } from 'src/app/share/models';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  value = 'profile';
  menu: BreadCrumbItem[];
  home: BreadCrumbItem;
  ownLink = 'core/account';
  constructor() { }

  ngOnInit() {
    this.setting();
  }

  setting() {
    this.home = { label: 'Trang chủ', icon: 'home-outline', routerLink: 'core/camera', replaceUrl: true };
    this.menu = [
      { label: 'Tài khoản', icon: 'people-outline', routerLink: this.ownLink, replaceUrl: true }
    ];
  }
}
