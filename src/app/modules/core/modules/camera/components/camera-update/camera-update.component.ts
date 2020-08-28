import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, OnChanges } from '@angular/core';
import { CategoryVM, BrandVM, CameraVM } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { CameraService } from 'src/app/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-camera-update',
  templateUrl: './camera-update.component.html',
  styleUrls: ['./camera-update.component.scss']
})
export class CameraUpdateComponent implements OnInit, OnChanges {
  @Input() categorys: CategoryVM[] = [];
  @Input() brands: BrandVM[] = [];
  @Input() row: CameraVM;
  @Output() useChange: EventEmitter<CameraVM> = new EventEmitter<CameraVM>();
  form: FormGroup;
  windowRef: any;
  constructor(
    protected readonly windowService: NbWindowService,
    protected readonly service: CameraService,
    protected readonly fb: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.form.get('Id').setValue(this.row ? this.row.Id : undefined);
    this.form.get('Name').setValue(this.row ? this.row.Name : undefined);
    this.form.get('Megapixel').setValue(this.row ? this.row.Megapixel : undefined);
    this.form.get('Price').setValue(this.row ? this.row.Price : undefined);
    this.form.get('Quantity').setValue(this.row ? this.row.Quantity : undefined);
    this.form.get('Description').setValue(this.row ? this.row.Description : '');
    this.form.get('BrandId').setValue(this.row ? this.row.BrandId : undefined);
    this.form.get('CategoryId').setValue(this.row ? this.row.CategoryId : undefined);
    this.form.get('Image').setValue(this.row ? this.row.Image : undefined);

  }

  openWindow(window: TemplateRef<any>, tittle: string) {
    this.windowRef = this.windowService.open(window, { title: tittle, windowClass: 'm-auto' });
  }

  useUpdate = async () => {
    await this.service.update(this.form.value)
      .then((res) => {
        this.useChange.emit(this.form.value);
        swal.fire('Thông báo', 'Cập nhật thành công', 'success');
        this.windowRef.close();
      })
      .catch((err) => {
        swal.fire('Thông báo', 'Cập nhật thất bại! Có lỗi xảy ra', 'error');
      });
  }

  initForm = () => {
    this.form = this.fb.group({
      Id: [undefined, Validators.required],
      Name: [undefined, Validators.required],
      Megapixel: [undefined, Validators.required],
      Price: [undefined, Validators.required],
      Quantity: [undefined, Validators.required],
      Image: [undefined, Validators.required],
      Description: [''],
      BrandId: [undefined, Validators.required],
      CategoryId: [undefined, Validators.required],
    });
  }

  selectImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.form.get('Image').setValue(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
