import { Component, OnInit } from '@angular/core';
import { siteInfo } from '../../shared/constants/info.constant';
import { ISiteInfo } from '../../shared/models/common.interface';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  siteInfo: ISiteInfo;

  ngOnInit() {
    this.siteInfo = siteInfo;
  }

}
