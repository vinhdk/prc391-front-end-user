import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss']
})
export class AccountPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly router: Router,
    protected readonly tokenService: TokenService,
  ) {
    this.form = this.fb.group({
      OldPassword: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RePassword: ['', Validators.required],
    },{
      validators: (form: FormGroup) => {
        return form.get('Password').value === form.get('RePassword').value ? null : { notSame: true };
      }
    });
  }

  ngOnInit() {
  }

  update() {
    if (this.form.valid) {
      this.authService.changePassword(this.form.value)
        .then(
          () => {
            swal.fire(
              'Thông báo',
              'Cập nhật thành công !',
              'success'
            )
          }
        ).catch(
          (e) => {
            console.log(e);
            swal.fire(
              'Thông báo',
              e.error.message,
              'error'
            )
          }
        );
    } else {
      swal.fire(
        'Dữ liệu nhập không đúng định dạng...',
        'Vui lòng kiểm tra định dạng!',
        'error'
      );
    }
  }
}
