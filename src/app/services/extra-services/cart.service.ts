import { Injectable } from "@angular/core";
import { Product } from "src/app/share/models";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor() {}
  cartSubject:Subject<Product[]> = new Subject<Product[]>();
  getALl = (): Product[] => {
    return localStorage.getItem("your-card")
      ? JSON.parse(localStorage.getItem("your-card"))
      : [];
  };

  addToCard = ({Id, Name, Quantity, Price, QuantityChoose, Image}: Product) => {
    const products = this.getALl();
    const pos = products.findIndex((e) => e.Id === Id);
    if (pos > -1) {
      products[pos].QuantityChoose = products[pos].QuantityChoose + 1;
    } else {
      QuantityChoose = 1;
      products.push({Id, Name, Quantity, Price, QuantityChoose, Image});
    }
    this.save(products);
  };

  subQuantity = (id: string) => {
    const products = this.getALl();
    const pos = products.findIndex((e) => e.Id === id);
    if (products[pos].QuantityChoose > 0) {
      products[pos].QuantityChoose = parseInt(products[pos].QuantityChoose + '') - 1;
    }
    this.save(products);
  };

  extraQuantity = (id: string) => {
    const products = this.getALl();
    const pos = products.findIndex((e) => e.Id === id);
    if (products[pos].QuantityChoose < products[pos].Quantity) {
      products[pos].QuantityChoose = parseInt(products[pos].QuantityChoose + '') + 1;
    }
    this.save(products);
  };

  remove = (id: string) => {
    const products = this.getALl().filter((e) => e.Id !== id);
    this.save(products);
  };

  updateQuantity = ({Id, Name, Quantity, Price, QuantityChoose, Image}: Product) => {
    QuantityChoose = parseInt(QuantityChoose + '');
    const products = this.getALl();
    const pos = products.findIndex((e) => e.Id === Id);
    if (pos > -1) {
      if (QuantityChoose <= products[pos].Quantity) {
        if (QuantityChoose >= 0) {
          products[pos].QuantityChoose = QuantityChoose;
        }
      } else {
        products[pos].QuantityChoose = products[pos].Quantity;
      }
    }
    this.save(products);
  };

  save = (products: Product[]) => {
    localStorage.setItem("your-card", JSON.stringify(products));
    this.cartSubject.next(products);
  };
}
