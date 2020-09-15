import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  @HostBinding('attr.class') cls = 'flex-fill';

  ngOnInit() {}
}
