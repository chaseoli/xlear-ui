import { Injectable } from '@angular/core'
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router'
import { Component } from '@angular/compiler/src/core'
import { SessionService } from '../services/session.service'

@Injectable({
  providedIn: 'root'
})
export class SessionResolver implements Resolve<Component> {
  constructor(private sessionService: SessionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    if (this.sessionService.user) {
      // session service perviously initialized...
      return
    } else {
      // wait to fetch user details for session
      return this.sessionService.getProfile()
    }
  }
}
