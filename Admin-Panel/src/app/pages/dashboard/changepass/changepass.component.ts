import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  myForm: FormGroup;
  errMag: any;
  constructor(private fb: FormBuilder, private lser: LoginService) { }
  chPass() {
    const fdata = this.myForm.getRawValue();
    if (fdata.np === fdata.cp) {
      const sendData = {'op' : fdata.op, 'np': fdata.np, 'uid' : localStorage.getItem('sid')};
      this.lser.changePassword(sendData)
      .subscribe(res => {
        console.log(res);
      });
    } else {
    this.errMag = 'Np and Cp are not match';
    }
  }
  ngOnInit() {
    this.validate();
  }
  validate() {
    this.myForm = this.fb.group(
      {
        op: ['', [Validators.required]],
        np: ['', [Validators.required]],
        cp: ['', [Validators.required]]
      });
  }
}
