import { Component, OnInit } from '@angular/core';
import { LoadService } from './loadservice';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // <-- typo fixed: "styleUrls" not "styleUrl"
})
export class AppComponent implements OnInit {
  title = 'my-app';
  showLoader$!: any; // or Observable<boolean> if you know type

  constructor(private loaderservice: LoadService) {}

  ngOnInit() {
    this.showLoader$ = this.loaderservice.Loading$; // safe to use here
  }
}
