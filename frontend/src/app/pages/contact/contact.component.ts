import { CatService } from './../../service/cat.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  myForm: FormGroup;
  resData;
  contData;

  constructor(private fb: FormBuilder, private cser: CatService) {
  }
  ngOnInit() {
    this.validate()
  }

  conData() {
    const fdata = this.myForm.getRawValue();
    console.log(fdata);
    this.cser.contactData(fdata).subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.contData = this.resData.cdata;
        console.log(this.contData);
        Swal.fire({ title: 'Thanku For Contacting', timer: 2000 });

      }
    });

  }
  validate() {
    this.myForm = this.fb.group(
      {
        yn: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.@]+')]],
        cn: ['', [Validators.required]],
        msg: ['', [Validators.required]]
      });
  }

}
