import { CatService } from './../../service/cat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: any;
  resData;
  proData;

  constructor(private ar: ActivatedRoute, private cser: CatService) { }

  ngOnInit() {
    this.ar.params.subscribe(par => {
      this.searchValue = par.ser;
      this.cser.searchProducts(this.searchValue)
        .subscribe(res => {
          console.log(res);
          this.resData = res;
          if (this.resData.err == 0) {
            if (this.resData.sdata.length > 0) {
              this.proData = this.resData.sdata;
            }
          }
        })
    })
  }
}
