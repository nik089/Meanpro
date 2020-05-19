import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  resData;
  catData;
  proData;
  constructor(private pser: ProductService, private router: Router) { }
  deletecat(id) {
    const con = confirm('Do u want to delete ?');
    // const con = swal.fire('Do U Want To Delete ?');
    if (con) {
      this.pser.delData({ cid: id }).subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.pser.getPro().subscribe(res => {
            this.resData = res;
            if (this.resData.err === 0) {
              this.catData = this.resData.cdata;
              Swal.fire({ title: 'Products Succesfully Deleted', timer: 2000 });
            }
          });
        }
      });
    }
  }
  ngOnInit() {
    this.pser.getPro().subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.proData = this.resData.pdata;
        console.log(this.proData);
      }
    });
  }
}
