import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})

export class AboutComponent implements OnInit {

  public aboutOpen = false;

  constructor() { }

  public ngOnInit() {
  }

  public open(msg: string) {
    this.aboutOpen = true;
  }

}
