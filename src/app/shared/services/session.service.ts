import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import { IPerson } from '../models/user'
import { LodashService } from 'src/app/shared/services/lodash.service'
import { UserService } from './user.service'

@Injectable()
export class SessionService {
  user: IPerson
  private init: boolean

  constructor(
    private db: UserService,
    public authService: AuthService,
    private _: LodashService
  ) {
    this.user = null
    this.getProfile()
    this.init = false
  }

  async getProfile() {
    if (!this.user) {
      try {
        let person = await this.db
          .getByUid((await this.authService.auth.currentUser).uid)
          .toPromise()

        if (!person && this.init === false) {
          this.init = true // prevent additional requests (causing redundant load on API)
          // if user does not exist then auth service was unsuccessful at
          // creating the user profile when the user registered.
          // retry here...
          person = {
            uid: (await this.authService.auth.currentUser).uid,
            email: (await this.authService.auth.currentUser).email,
          }

          await this.db.update(person).toPromise()
        }

        this.user = person
        return person
      } catch (error) {
        console.log(error)
      }
    }
  }
}
