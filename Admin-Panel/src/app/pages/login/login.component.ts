import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginService} from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  resData;
  errMsg;
  constructor(private fb: FormBuilder, private lser: LoginService, private router: Router) { }

  ngOnInit() {
    this.validate();
  }
  postData() {
    const fdata = this.myForm.getRawValue();
    console.log(fdata);

    this.lser.loginAdmin(fdata)
    .subscribe(res => {
      console.log(res);
      this.resData = res;
      if (this.resData.err === 0) {
        localStorage.setItem('sid', this.resData.uid);
        this.router.navigate(['/dashboard']);
      }
      if (this.resData.err === 1) {
        this.errMsg = this.resData.msg;
      }

      }, err => {
        console.log(err);
      });
  }


  validate() {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
        password: ['', [Validators.required]]
      });
  }

}
