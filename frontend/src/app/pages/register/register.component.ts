import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatService } from 'src/app/service/cat.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  resData;
  reData;

  constructor(private fb: FormBuilder, private cser: CatService) { }

  ngOnInit() {
    this.validate();
  }

  regData() {
    const fdata = this.myForm.getRawValue();
    console.log(fdata);

    this.cser.regData(fdata).subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.reData = this.resData.rdata;
        console.log(this.reData);
        Swal.fire({ title: 'Products Succesfully Deleted', timer: 2000 });
      }
    });
  }
  validate() {
    this.myForm = this.fb.group({
      fn: ['', [Validators.required]],
      ln: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
      pass: ['', [Validators.required]],
      cpass: ['', [Validators.required]]
    });
  }
}
