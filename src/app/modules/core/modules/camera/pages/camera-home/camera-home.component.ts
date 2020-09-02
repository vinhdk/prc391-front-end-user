import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem } from 'src/app/share/models';
import { Options, LabelType } from 'ng5-slider';
@Component({
  selector: 'app-camera-home',
  templateUrl: './camera-home.component.html',
  styleUrls: ['./camera-home.component.scss']
})
export class CameraHomeComponent implements OnInit {
  menu: BreadCrumbItem[];
  home: BreadCrumbItem;
  ownLink = 'core/brand';
  optionPrice: Options = {
    floor: 0,
    ceil: 300000000,
    step: 5000000,
    translate: (value: number, label: LabelType) => {
        return (value / 1000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' triệu';
    }
  };

  optionMegapixel: Options = {
    floor: 0,
    ceil: 100,
    step: 0.5,
    translate: (value: number, label: LabelType) => {
      return value + 'M';
    }
  };
  constructor() { }

  ngOnInit() {
    this.setting();
  }

  setting() {
    this.home = { label: 'Trang chủ', icon: 'home-outline', routerLink: 'core/camera', replaceUrl: true };
    this.menu = [
      { label: 'Máy ảnh', icon: 'camera-outline', routerLink: this.ownLink, replaceUrl: true }
    ];
  }

}
