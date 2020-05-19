import { CatService } from './../../service/cat.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  resData;
  proData;
  constructor(private pser: CatService) { }

  ngOnInit() {
    this.pser.getPro().subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.proData = this.resData.pdata;
        // console.log(this.proData);
      }
    });
  }

  addcart(pid) {
    if (localStorage.getItem('pcart') != undefined) {
      const arr = JSON.parse(localStorage.getItem('pcart'));
      arr.push(pid);
      localStorage.setItem('pcart', JSON.stringify(arr));
      Swal.fire('Product Add cart Successfully');

    } else {
      const arr = [];
      arr.push(pid);
      localStorage.setItem('pcart', JSON.stringify(arr));
      Swal.fire('Product Add cart Successfully');
    }
  }
}
