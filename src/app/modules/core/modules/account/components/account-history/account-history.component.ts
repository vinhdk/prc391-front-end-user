import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderVM, OrderDetailVM } from 'src/app/models';
import { NbWindowService } from '@nebular/theme';
import { OrderService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss']
})
export class AccountHistoryComponent implements OnInit {
  orders: OrderVM[] = [];
  details: OrderDetailVM[] = [];
  windowRef: any;
  constructor(
    protected readonly windownService: NbWindowService,
    protected readonly orderService: OrderService,
    protected readonly authService: AuthService
  ) {}

  async ngOnInit() {
    await this.loadHistory();
  }

  openWindow(window: TemplateRef<any>, tittle: string) {
    this.windowRef = this.windownService.open(window, {
      title: tittle,
      windowClass: "m-auto",
    });
  }

  loadHistory = () => {
    this.authService.touchToken().then((res) => {
      this.orders = res.Orders;
    });
  };

  useSelect = ({selected}) => {
    this.orderService.getById(selected[0].Id)
      .then((res) => {
        this.details = res.OrderDetails;
    });
  }

  useChangePrice = (price: number) => {
    return parseInt((price / 1000000).toFixed(0));
  }
}
