import swal from 'sweetalert2';
import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
  NbSearchService,
  NbWindowService,
} from "@nebular/theme";

import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Product } from "../../models";
import {
  CartService,
  AuthService,
  TokenService,
  LayoutService,
  OrderService,
} from "src/app/services";
import { OrderDetailCM, OrderCM } from 'src/app/models';

@Component({
  selector: "app-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  username = "";
  products: Product[] = [];
  total: number = 0;
  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];
  currentTheme = "default";

  userMenu = [
    {
      title: "Đăng nhập",
      data: "login",
      icon: "log-in-outline",
    },
  ];
  picture: any;
  windowRef: any;
  constructor(
    protected readonly sidebarService: NbSidebarService,
    protected readonly menuService: NbMenuService,
    protected readonly themeService: NbThemeService,
    protected readonly layoutService: LayoutService,
    protected readonly breakpointService: NbMediaBreakpointsService,
    protected readonly tokenService: TokenService,
    protected readonly authService: AuthService,
    protected readonly router: Router,
    protected readonly searchService: NbSearchService,
    protected readonly cartService: CartService,
    protected readonly windownService: NbWindowService,
    protected readonly orderService: OrderService,
  ) {
    authService.touchToken().then((res) => {
      this.userMenu = [
        {
          title: "Hồ sơ",
          data: "profile",
          icon: "person-outline",
        },
        {
          title: "Thoát",
          data: "logout",
          icon: "log-out-outline",
        },
      ];
    });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
    this.menuService.onItemClick().subscribe((selected) => {
      if (selected.item.data === "logout") {
        this.logout();
      } else if(selected.item.data === "login") {
        this.router.navigate(['auth/login']);
      }else {
        this.router.navigate(['core/account']);
      }
    });
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log(data);
    });
    this.searchService.onSearchInput().subscribe((data: any) => {
      console.log(data);
    });
    this.picture = "../../assets/camera.png";
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(["auth"]);
  }

  updateCard = () => {
    this.products = this.cartService.getALl();
    this.total = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      this.total += product.Price * product.QuantityChoose;
    }
  };

  useChange = (
    type: "add" | "remove" | "update" | "extra" | "sub",
    id: string,
    data: string | Product,
    quantity: number
  ) => {
    switch (type) {
      case "add":
        this.cartService.addToCard(data as Product);
        break;
      case "remove":
        this.cartService.remove(id as string);
        break;
      case "update":
        this.cartService.updateQuantity({...data as Product, QuantityChoose: quantity});
        break;
      case "extra":
        this.cartService.extraQuantity(id as string);
        break;
      case "sub":
        this.cartService.subQuantity(id as string);
        break;
      default:
        break;
    }
    this.updateCard();
  }

  openWindow(window: TemplateRef<any>, tittle: string) {
    this.updateCard();
    this.windowRef = this.windownService.open(window, {
      title: tittle,
      windowClass: "m-auto",
    });
  }

  buy = () => {
    this.authService.touchToken().then(async (account) => {
      const details = this.products.map((e) => new OrderDetailCM({CameraId: e.Id, Quantity: e.QuantityChoose}));
      await this.orderService.insert(new OrderCM({OrderDetails: details}).getData())
      .then((res) => {
        swal.fire('Thông báo', 'Mua hàng thành công', 'success');
        localStorage.removeItem('your-card');
        this.windowRef.close();
      }).catch((err) => {
        swal.fire('Thông báo', 'Mua hàng thất bại', 'error');
      })
    }).catch((err) => {
      this.router.navigate(['auth/login']);
    });
  }
}
