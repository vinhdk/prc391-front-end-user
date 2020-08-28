import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, TokenService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    protected readonly router: Router,
    protected readonly tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(6)]],
      Fullname: ['', [Validators.required, Validators.minLength(8)]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern(/^(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}$/)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      RePassword: ['', Validators.required],
    },{
      validators: (form: FormGroup) => {
        return form.get('Password').value === form.get('RePassword').value ? null : { notSame: true };
      }
    });

  }
  register() {
    if (this.form.valid) {
      this.authService.register(this.form.value)
        .then(
          (res) => {
            this.tokenService.setToken(res, this.form.value.Username);
            this.router.navigateByUrl('core');
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
}
