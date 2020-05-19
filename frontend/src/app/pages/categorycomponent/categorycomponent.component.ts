import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatService } from 'src/app/service/cat.service';

@Component({
  selector: 'app-categorycomponent',
  templateUrl: './categorycomponent.component.html',
  styleUrls: ['./categorycomponent.component.css']
})
export class CategorycomponentComponent implements OnInit {
  catname: any;
  resData;
  proData;

  constructor(private ar: ActivatedRoute, private pser: CatService) { }

  ngOnInit() {
    this.ar.params.subscribe(par => {
      this.catname = par.cname;
      this.pser.getProductByCategory(this.catname)
        .subscribe(res => {
          console.log(res);
          this.resData = res;
          if (this.resData.err == 0) {
            this.proData = this.resData.pdata;
          }
        })
    })
  }
}

