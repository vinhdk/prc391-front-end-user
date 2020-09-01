import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CameraVM, BrandVM, CategoryVM } from "src/app/models";
import {
  CameraService,
  CategoryService,
  BrandService,
  CartService,
} from "src/app/services";
import swal from "sweetalert2";
@Component({
  selector: "app-camera-list",
  templateUrl: "./camera-list.component.html",
  styleUrls: ["./camera-list.component.scss"],
})
export class CameraListComponent implements OnInit {
  @Output() useChange: EventEmitter<CameraVM> = new EventEmitter<CameraVM>();
  rows: CameraVM[] = [];
  brands: BrandVM[] = [];
  filterBrands: string[] = [];
  categorys: CategoryVM[] = [];
  filterCategorys: string[] = [];
  filterRows: CameraVM[] = [];
  pagingRows: CameraVM[] = [];
  row: CameraVM;
  filterPrices: number[] = [0, 300000000];
  filterMegapixels: number[] = [0, 100];
  index = 0;
  constructor(
    protected readonly service: CameraService,
    protected readonly categoryService: CategoryService,
    protected readonly brandService: BrandService,
    protected readonly cartService: CartService
  ) {}

  async ngOnInit() {
    await this.useLoad();
  }

  useLoad = async () => {
    await this.brandService.getAll().then((res) => {
      this.brands = res;
    });
    await this.categoryService.getAll().then((res) => {
      this.categorys = res;
    });
    await this.service.getAll().then((res) => {
      this.rows = res;
      this.useSearch();
      this.usePaging();
    });
  };
  useSelect = ({ selected }) => {
    this.row = selected[0];
    this.useChange.emit(this.row);
  };

  useFilter = (
    value: string | number[],
    type: "category" | "brand" | "price" | "megapixel"
  ) => {
    this.filterRows = [];
    this.index = 0;
    switch (type) {
      case "category":
        const posCategory = this.filterCategorys.indexOf(value as string);
        posCategory > -1
          ? this.filterCategorys.splice(posCategory, 1)
          : this.filterCategorys.push(value as string);
        break;
      case "brand":
        const posBrand = this.filterBrands.indexOf(value as string);
        posBrand > -1
          ? this.filterBrands.splice(posBrand, 1)
          : this.filterBrands.push(value as string);
        break;
      case "price":
        this.filterPrices = value as number[];
        break;
      case "megapixel":
        this.filterMegapixels = value as number[];
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.useSearch();
      this.usePaging();
    }, 50);
  };

  useGetBrand = (id: string) => {
    return this.brands.find((brand) => brand.Id === id)
      ? this.brands.find((brand) => brand.Id === id).Name
      : "";
  };
  useGetCategory = (id: string) => {
    return this.categorys.find((category) => category.Id === id)
      ? this.categorys.find((category) => category.Id === id).Name
      : "";
  };

  useChangePage = (event) => {
    this.index = event.page;
    this.usePaging();
  };

  usePaging = () => {
    this.pagingRows = [];
    for (let i = this.index * 30; i < 30 * (this.index + 1); i++) {
      const row = this.filterRows[i];
      if (
        row &&
        (this.filterBrands.length === 0
          ? true
          : this.filterBrands.indexOf(row.BrandId) > -1) &&
        (this.filterCategorys.length === 0
          ? true
          : this.filterCategorys.indexOf(row.CategoryId) > -1) &&
        row.Price >= this.filterPrices[0] &&
        row.Price <= this.filterPrices[1] &&
        row.Megapixel >= this.filterMegapixels[0] &&
        row.Megapixel <= this.filterMegapixels[1]
      ) {
        this.pagingRows.push(row);
      }
    }
  };

  useSearch = () => {
    this.filterRows = this.rows.filter(
      (row) =>
        (this.filterBrands.length === 0
          ? true
          : this.filterBrands.indexOf(row.BrandId) > -1) &&
        (this.filterCategorys.length === 0
          ? true
          : this.filterCategorys.indexOf(row.CategoryId) > -1) &&
        row.Price >= this.filterPrices[0] &&
        row.Price <= this.filterPrices[1] &&
        row.Megapixel >= this.filterMegapixels[0] &&
        row.Megapixel <= this.filterMegapixels[1]
    );
  };
  addToCard = (data: CameraVM) => {
    this.cartService.addToCard({ ...data, QuantityChoose: 1 });
    document.getElementById("cart-icon").click();
  };

  useChangePrice = (price: number) => {
    return parseInt((price / 1000000).toFixed(0));
  }
}
