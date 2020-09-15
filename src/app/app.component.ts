import { Component, HostBinding } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('attr.class') cls = 'flex-fill';
  constructor(
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer
  ){
    iconReg.addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/logos/xlear-logo.svg'));
  }
}
