import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html'
})
export class SecureComponent implements OnInit {


  // page resize watcher
  resizeWatcher: any;
  activeMediaQuery: any;
  
  constructor(
    public mediaObserver: MediaObserver,
    public authService: AuthService,
    public sessionService: SessionService
  ) {

    this.resizeWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if (this.activeMediaQuery) {
        this.resizeView(change.mqAlias);
      }

    });
  }

  ngOnInit(){

  }

  /**
   * clean up angular processes
   *
   * @memberof AppComponent
   */
  ngOnDestroy() {
    this.resizeWatcher.unsubscribe();
  }

  /**
   * Fires function when the view port size changes
   *
   * @param {string} size
   * @memberof AppComponent
   */
  resizeView(size: string) {

    // Do something special since the viewport is currently
    // using mobile display sizes
    console.log('is ' + size);

    if (size === 'xs') {
     // TODO...
     console.log('view is super small')
    } else {
      // TODO...
      console.log('view is big')
    }

  }

}
