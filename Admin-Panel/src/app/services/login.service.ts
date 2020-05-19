import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  loginAdmin(data) {
    return this.http.post(`${URL}adminlogin`, data);
  }
  changePassword(data) {
    return this.http.post(`${URL}changepass`, data);
  }
}
