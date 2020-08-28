import { Component, OnInit, Output, EventEmitter, TemplateRef, Input } from '@angular/core';
import { CameraVM, CategoryVM, BrandVM } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { CameraService } from 'src/app/services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-camera-create',
  templateUrl: './camera-create.component.html',
  styleUrls: ['./camera-create.component.scss']
})
export class CameraCreateComponent implements OnInit {
  @Input() categorys: CategoryVM[] = [];
  @Input() brands: BrandVM[] = [];
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

  openWindow(window: TemplateRef<any>, tittle: string) {
    this.windowRef = this.windowService.open(window, { title: tittle, windowClass: 'm-auto' });
  }

  useCreate = async () => {
    this.form.get('Quantity').setValue(parseInt(this.form.get('Quantity').value, 0));
    this.form.get('Price').setValue(parseInt(this.form.get('Price').value, 0));
    this.form.get('Megapixel').setValue(parseFloat(this.form.get('Megapixel').value));
    await this.service.insert(this.form.value)
      .then((res) => {
        this.useChange.emit(this.form.value);
        swal.fire('Thông báo', 'Thêm mới thành công', 'success');
        this.windowRef.close();
        this.form.reset();
      })
      .catch((err) => {
        swal.fire('Thông báo', 'Thêm mới thất bại! Có lỗi xảy ra', 'error');
      });
  }

  initForm = () => {
    this.form = this.fb.group({
      Name: ['', Validators.required],
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
