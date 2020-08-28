import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  form: FormGroup;
  constructor(
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly router: Router,
    protected readonly tokenService: TokenService,
  ) {
    this.form = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(6)]],
      Fullname: ['', [Validators.required, Validators.minLength(8)]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern(/^(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}$/)]],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }
  update() {
    if (this.form.valid) {
      this.authService.update(this.form.value)
        .then(
          () => {
            swal.fire(
              'Thông báo',
              'Cập nhật thành công !',
              'success'
            )
          }
        ).catch(
          (e) => swal.fire(
            'Thông báo',
            e.error.message,
            'error'
          )
        );
    } else {
      swal.fire(
        'Dữ liệu nhập không đúng định dạng...',
        'Vui lòng kiểm tra định dạng!',
        'error'
      );
    }
  }
  loadProfile = () => {
    this.authService.touchToken().then((res) => {
        this.form.patchValue(res);
    });
  }
}
