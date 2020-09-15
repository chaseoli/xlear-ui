import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-layout',
  templateUrl: './article-layout.component.html',
  styleUrls: ['./article-layout.component.scss'],
})
export class ArticleLayoutComponent implements OnInit {
  navWidth: string;
  articleWidth: string;
  asideWidth: string;

  showNav: boolean;
  showAside: boolean;

  arr = Array(2000);

  constructor() {
    this.init();
  }
  ngOnInit() {}

  ngAfterViewInit(): void {}

  init() {
    this.showNav = false;
    this.showAside = false;
  }

  toggleNav() {
    this.showNav = !this.showNav;
    this.updateWidths();
  }

  toggleAside() {
    this.showAside = !this.showAside;
    this.updateWidths();
  }

  updateWidths() {
    // both are open
    if (this.showNav && this.showAside) {
      this.navWidth = '20%';
      this.articleWidth = '60%';
      this.asideWidth = '20%';
    }
    // only nav open
    else if (this.showNav) {
      this.navWidth = '20%';
      this.articleWidth = '80%';
      this.asideWidth = '0%';
    }
    // only aside open
    else if (this.showAside) {
      this.navWidth = '0%';
      this.articleWidth = '80%';
      this.asideWidth = '20%';
    }
    // neither are open
    else {
      this.navWidth = '0%';
      this.articleWidth = '100%';
      this.asideWidth = '0%';
    }
  }
}
