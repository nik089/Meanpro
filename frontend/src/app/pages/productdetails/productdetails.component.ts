import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/service/cat.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  pid: any;
  resData: any;
  proData: any;

  constructor(private ar: ActivatedRoute, private cser: CatService) { }

  ngOnInit() {
    this.ar.params.subscribe(par => {
      this.pid = par.pid;
      this.cser.getProductById(this.pid)
        .subscribe(res => {
          this.resData = res;
          if (this.resData.err == 0) {
            this.proData = this.resData.pdata;
            console.log(this.proData)
          }
        })
    })
  }
}
