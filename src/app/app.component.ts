import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app';
  parentComponentData: number[] = [];
  data$ = new BehaviorSubject([]);

  counter = 0;
  lastHeight = 0;

  ngOnInit() {
    for (let i = 0; i <= 20; i++) {
      this.addItem();
    }

    this.data$.next(this.parentComponentData);
  }

  addItem() {
    this.parentComponentData.unshift(this.counter);
    this.counter++;
  }

  callbackMethod() {
    this.parentComponentData = [];
    for (let i = 0; i <= 10; i++) {
      this.addItem();
    }

    this.data$.next(this.parentComponentData);
  }
}
