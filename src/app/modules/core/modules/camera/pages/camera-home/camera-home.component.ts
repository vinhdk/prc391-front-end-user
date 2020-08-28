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
    ceil: 10000,
    step: 100,
    showTicksValues: true,
    tickStep: 2000,
    tickValueStep: 5,
    translate: (value: number, label: LabelType) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đô';
    }
  };

  optionMegapixel: Options = {
    floor: 0,
    ceil: 100,
    step: 0.5,
    showTicksValues: true,
    tickStep: 10,
    tickValueStep: 10,
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
