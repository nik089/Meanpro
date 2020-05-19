import { Component, OnInit } from '@angular/core';
import { CategroyService } from 'src/app/services/categroy.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  resData;
  catData;
  constructor(private catser: CategroyService, private router: Router) { }

  ngOnInit() {
    this.catser.getCat().subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.catData = this.resData.cdata;
        console.log(this.catData);
      }
    });
  }
  deleteCat(id) {
    const con = confirm('Do u want to delete ?'); ``
    // const con = swal.fire('Do U Want To Delete ?');
    if (con) {
      this.catser.delData({ cid: id }).subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.catser.getCat().subscribe(res => {
            this.resData = res;
            if (this.resData.err === 0) {
              this.catData = this.resData.cdata;
              console.log(this.catData);
              Swal.fire({ title: 'Category Succesfully Deleted', timer: 2000 });
            }
          });
        }
      });
    }
  }
  editCat(cid) {
    this.router.navigate([`dashboard/addcategory/${cid}`]);
  }
}
