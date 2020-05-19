import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../url';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  feedData() {
    return this.http.get(`${URL}feedback`);
  }
}
