import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {
  lastHeight = 0;
  lastHeightCheck = 0;

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  @Input() data: Observable<number[]>;
  _data: number[] = [];

  @Output() scrolled = new EventEmitter<string>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.scrollTop === 0) {
      this.lastHeight = this.scrollContainer.nativeElement.scrollHeight;
      this.scrolled.emit('complete');
    }
  }

  constructor(private CD: ChangeDetectorRef) {}

  ngOnInit() {
    this.data.subscribe(value => {
      value
        .sort(function(a, b) {
          return a - b;
        })
        .forEach(element => {
          this._data.unshift(element);
        });
      this.CD.detectChanges();
    });
  }

  scrollTopValue() {
    if (this.lastHeightCheck === this.lastHeight) {
      return this.scrollContainer.nativeElement.scrollHeight - this.lastHeight;
    }
    this.lastHeightCheck = this.lastHeight;
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight - this.lastHeight;
    return this.scrollContainer.nativeElement.scrollTop;
  }
}
