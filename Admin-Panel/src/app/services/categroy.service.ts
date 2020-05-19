import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../url';

@Injectable({
  providedIn: 'root'
})
export class CategroyService {

  constructor(private http: HttpClient) { }
  addCategory(data) {
    return this.http.post(`${URL}addcategory`, data);
  }
  getCat() {
    return this.http.get(`${URL}getcategory`);
  }
  getCatById(cid) {
    return this.http.get(`${URL}getcategory/${cid}`);
  }
  delData(data) {
    return this.http.post(`${URL}delcategory`, data);
  }
  editCategory(data) {
    return this.http.post(`${URL}editcategory`, data);
  }
  editCategoryWithImage(data) {
    return this.http.post(`${URL}editcategorybyimage`, data);
  }
}
