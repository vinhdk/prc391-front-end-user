import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem } from 'src/app/share/models';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {
  values = [{label: 'Cập nhật hồ sơ', value: 'profile'}, {label: 'Cập nhật mật khẩu', value: 'password'}, {label: 'Lịch sử mua hàng', value: 'history'}];
  form: FormGroup;
  menu: BreadCrumbItem[];
  home: BreadCrumbItem;
  ownLink = 'core/account';
  constructor(protected readonly fb: FormBuilder) {
      this.form = this.fb.group({
        Name: ['profile']
      });
   }

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
