import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL } from "../url";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}
  addProduct(data) {
    return this.http.post(`${URL}addproduct`, data);
  }
  getPro() {
    return this.http.get(`${URL}fetchproduct`);
  }
  delData(data) {
    return this.http.post(`${URL}delproduct`, data);
  }
}
