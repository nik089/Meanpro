import { URL } from '../url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient) { }
  getCat() {
    return this.http.get(`${URL}getcategory`);
  }
  getPro() {
    return this.http.get(`${URL}fetchproduct`);
  }
  getProductByCategory(cname) {
    return this.http.get(`${URL}fetchproduct/${cname}`);
  }
  regData(data) {
    return this.http.post(`${URL}registration`, data);
  }
  signIn(data) {
    return this.http.post(`${URL}getSign`, data);
  }
  contactData(data) {
    return this.http.post(`${URL}contactdata`, data);
  }
  searchProducts(ser) {
    return this.http.get(`${URL}searchproduct/${ser}`);
  }
  getProductById(pid) {
    return this.http.get(`${URL}fetchproductbyid/${pid}`);
  }
  CartById(cartid) {
    return this.http.get(`${URL}getcart/${cartid}`);

  }
}
