import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  resData;
  cntdata;

  constructor(private fb: FeedbackService) { }
  ngOnInit() {
    this.fb.feedData().subscribe(res => {
      this.resData = res;
      if (this.resData.err === 0) {
        this.cntdata = this.resData.fedata;
        console.log(this.cntdata);
      }
    });
  }

}
