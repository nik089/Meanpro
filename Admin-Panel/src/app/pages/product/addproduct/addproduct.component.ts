import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategroyService } from 'src/app/services/categroy.service';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  myForm: FormGroup;
  imageName: any;
  resData;
  catData;
  constructor(
    private fb: FormBuilder,
    private catser: CategroyService,
    private pser: ProductService
  ) {
    this.myForm = this.fb.group({
      cname: ['', Validators.required],
      pname: ['', Validators.required],
      price: ['', Validators.required],
      features: ['', Validators.required]
    });
  }
  myImage(event) {
    if (event.target.files.length > 0) {
      this.imageName = event.target.files[0];
      console.log(this.imageName);
    }
  }
  addpro() {
    // tslint:disable-next-line: curly
    if (this.imageName !== undefined) {
      const cname = this.myForm.controls.cname.value;
      const pname = this.myForm.controls.pname.value;
      const price = this.myForm.controls.price.value;
      const features = this.myForm.controls.features.value;

      // Use formData when we send any attachment
      const formData = new FormData();
      formData.append('cname', cname);
      formData.append('attach', this.imageName);
      formData.append('pname', pname);
      formData.append('price', price);
      formData.append('features', features);
      this.pser.addProduct(formData).subscribe(res => {
        console.log(res);
        Swal.fire({ title: 'Products Succesfully Added!!!', timer: 2000 });
      });
    } else {
      // console.log('Plz select a image');
      swal.fire('Plz Select a Image');
      // error plz select image
    }
  }
  ngOnInit() {
    this.catser.getCat().subscribe(res => {
      this.resData = res;
      console.log(res);
      if (this.resData.err === 0) {
        this.catData = this.resData.cdata;
      }
    });
  }
}
