import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategroyService } from 'src/app/services/categroy.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  myForm: FormGroup;
  imageName: any;
  resData;
  errMsg;
  sussMsg;
  cid: any;
  cdata; any;

  constructor(private fb: FormBuilder, private catser: CategroyService, private ar: ActivatedRoute) {
    this.myForm = this.fb.group({
      cname: ['', Validators.required]
    });
  }
  myImage(event) {
    if (event.target.files.length > 0) {
      this.imageName = event.target.files[0];
      console.log(this.imageName);
    }
  }
  editcat() {
    if (this.imageName !== undefined) {
      const cname = this.myForm.controls.cname.value;
      const formData = new FormData();
      formData.append('cname', cname);
      formData.append('attach', this.imageName);
      formData.append('cid', this.cid);
      this.catser.editCategoryWithImage(formData)
        .subscribe(res => {
          console.log(res);
          this.resData = res;
          Swal.fire({ title: 'Category  Succesfully Edit', timer: 2000 });
          if (this.resData.err === 0) {
            this.sussMsg = this.resData.msg;
          }
        })
    } else {
      const cname = this.myForm.controls.cname.value;
      this.catser.editCategory({ 'cname': cname, 'cid': this.cid })
        .subscribe(res => {
          console.log(res);
          Swal.fire({ title: 'Category  Succesfully Edit', timer: 2000 });

        })
    }
  }
  addcat() {
    // tslint:disable-next-line: curly
    if (this.imageName !== undefined) {
      const cname = this.myForm.controls.cname.value;

      // Use formData when we send any attachment
      const formData = new FormData();
      formData.append('cname', cname);
      formData.append('attach', this.imageName);
      this.catser.addCategory(formData)
        .subscribe(res => {
          console.log(res);
          Swal.fire({ title: 'Category Succesfully Added', timer: 2000 });
          //   this.resData=res;
          // //   if(this.resData.err==0)
          // //   {
          // //     this.sussMsg=this.resData.msg;
          // //   }
          // // })
        });
    } else {
      // console.log('Plz select a image');
      Swal.fire('Plz Select a Image');

      // error plz select image
    }
  }
  ngOnInit() {
    this.ar.params.subscribe(par => {
      this.cid = par.cid;
      this.catser.getCatById(this.cid)
        .subscribe(res => {
          console.log(res);
          this.resData = res;
          if (this.resData.err === 0) {
            this.cdata = this.resData.cdata;
            console.log(this.cdata);
            this.myForm.controls.cname.patchValue(this.cdata.cname);
          }
        });
    });
  }
}

