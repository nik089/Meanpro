import { Router } from '@angular/router';
import { CatService } from './../../service/cat.service';
import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider/options';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  value: number = 2000;
  highValue: number = 6000;
  options: Options = {
    floor: 500,
    ceil: 50000
  };
  resData;
  catData;
  constructor(private cser: CatService, private router: Router) { }
  priceFilter() {
    console.log(this.value + " " + this.highValue);
    this.router.navigate([`productpricefilter/${this.value}/${this.highValue}`]);
  }

  ngOnInit() {
    console.log(this.value + " " + this.highValue);

    this.cser.getCat().subscribe(
      res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.catData = this.resData.cdata;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
