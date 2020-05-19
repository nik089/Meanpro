import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (localStorage.getItem('sid') == null) {
      Swal.fire('Oops...', 'Something went wrong!', 'error');
      this.router.navigate(['/']);
    } else {
      return true;
    }
  }
}
