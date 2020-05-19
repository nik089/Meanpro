import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatService } from 'src/app/service/cat.service';
import Swal from 'sweetalert2';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';




@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  myForm: FormGroup;
  resData;
  errMsg;
  sucMsgg;

  constructor(private fb: FormBuilder, private cser: CatService, private router: Router, private authService: AuthService) { }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.router.navigate(['/']);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.router.navigate(['/']);

  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.validate();
  }

  signData() {
    const fdata = this.myForm.getRawValue();
    this.cser.signIn(fdata)
      .subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          localStorage.setItem('sid', this.resData.uid);
          this.sucMsgg = this.resData.msg;
          this.router.navigate(['/']);
        }
        if (this.resData.err === 1) {
          Swal.fire('Login Not Successful', 'Please Check Email Or Password', 'error');
          this.errMsg = this.resData.msg;
        }

      }, err => {
        console.log(err);
      });
  }
  validate() {
    this.myForm = this.fb.group(
      {
        pass: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]]
      });
  }
}
