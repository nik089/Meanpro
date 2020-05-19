import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Uid: string;
  constructor(private router: Router) { }
  logout() {
    const con = confirm('Do u want to Logout');
    if (con) {
      localStorage.removeItem('sid');
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.Uid = localStorage.getItem('sid');
  }
}
