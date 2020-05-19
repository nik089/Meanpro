import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatService } from 'src/app/service/cat.service';
import { AuthService } from 'angularx-social-login';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  resData;
  catData;
  Uid: string;
  userData;
  cartItem: number = 0;
  search: any;

  constructor(private cser: CatService, private router: Router, private authService: AuthService) { }
  onSearch() {
    if (this.search != undefined) {
      this.router.navigate(['search/' + this.search])
    }
  }
  logout() {
    this.authService.signOut();
    const con = Swal.fire('Do u want to Logout');
    if (con) {
      localStorage.removeItem('sid');
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.userData = user;
    });

    // add cart
    if (localStorage.getItem('pcart') != undefined) {
      const arr = JSON.parse(localStorage.getItem('pcart'));
      this.cartItem = arr.length;
    }

    this.cser.getCat()
      .subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.catData = this.resData.cdata;
        }
      });

    this.Uid = localStorage.getItem('sid');
    this.cser.getCat()
      .subscribe(res => {
        this.resData = res;
        if (this.resData.err === 0) {
          this.catData = this.resData.cdata;
        }
      });
  }

}
