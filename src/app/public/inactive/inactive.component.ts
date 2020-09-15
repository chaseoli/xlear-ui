import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent implements OnInit {

  @HostBinding('attr.class') cls = 'flex-fill'

  constructor() { }

  ngOnInit() {
  }

}
