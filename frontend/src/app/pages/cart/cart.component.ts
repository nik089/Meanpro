import { CatService } from 'src/app/service/cat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  resData: any;
  cartid: any;
  proData: any;
  constructor(private cser: CatService, private ar: ActivatedRoute) { }
  ngOnInit() {
    this.ar.params.subscribe(par => {
      this.cartid = par.cartid;
      this.cser.CartById(this.cartid)
        .subscribe(res => {
          this.resData = res;
          if (this.resData.err == 0) {
            this.proData = this.resData.crtdata;
            console.log(this.proData);
          }
        });
    });
  }
}
