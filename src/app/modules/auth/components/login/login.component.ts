import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly router: Router,
    protected readonly tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });

  }
  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .then(
          (res) => {
            this.tokenService.setToken(res, this.form.value.Username);
            this.router.navigateByUrl('core');
          }
        ).catch(
          (e) => swal.fire(
            'Tài khoản và mật khẩu không khớp',
            'Vui lòng kiểm tra lại !',
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

}
