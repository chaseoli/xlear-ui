import { Injectable, NgZone } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { UserInfo } from 'firebase'
import { environment } from '../../../environments/environment'
import { IUserMeta, IPerson } from '../models/user'
import { HttpHeaders } from '@angular/common/http'
import * as firebase from 'firebase/app'
import 'firebase/auth'

// import { HttpClient } from '@angular/common/http';
// TODO: 'firebase/auth' can't find auth module,
// need to look at firebase docs to see if there
// is a way to just import firebase auth module

import { OnDestroy } from '@angular/core'
import { Subject, timer, Subscription, Observable } from 'rxjs'
import { takeUntil, take } from 'rxjs/operators'
import { WindowService } from './window.service'
import { UserService } from './user.service'

@Injectable()
export class AuthService implements OnDestroy {
  // IMPORTANT: instead of 'user'
  // user firebase.auth.currentUser
  // user: UserInfo;

  // IMPORTANT: firebase.auth.currentUser should be in scope
  // where needed since the "auth.guard.ts" waits to load view
  // until user is loaded so "watchUser()" is no longer needed

  // IMPORTANT: As a best practice use angularFire as much as possible
  // when checking permissions as abstracting new functions in this
  // service could result in inconsistency between the
  // auth.service.ts and the angularFire.auth service

  // user$: Observable<User | null>;
  // isInitialized: boolean;
  loginError: string
  registrationError: string
  email: string
  submitted: boolean

  // firebase profile as an observable that can be unsubscribed when
  // a user logs out
  private profileRef: firebase.database.Reference

  /**
   * Set current user of the session.
   * Use to gather permissions, etc. other
   * necessary information about the user
   * for viewing certain routes
   * NOTE: see watchUser for getting user profile
   *
   * @type {IUserMeta}
   */
  userMeta: IUserMeta

  constructor(
    // auth is public so that components can reference
    // fields like "this.auth.auth.currentUser.uid"
    // in the html view
    public auth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private windowService: WindowService,
    private userService: UserService
  ) {
    // initialize user session watcher
    // to execute a custom action on sign-in and sign-out
    this.watchUser()
  }

  async registerEmailPassword(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password).then(
      async (userCredential: firebase.auth.UserCredential) => {
        // success
        console.log('Registered: ', userCredential.user.email)

        // create the user in mongo. Usually you would want to do
        // this on the server side. However, this is fine to do on
        // the client side since there is no significant security
        // threat given that the user has to be authenticated to the
        // api server to create the user record for themselves.
        const person: IPerson = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        }
        await this.userService.update(person).toPromise()

        return
      },
      (error) => {
        // failure
        return Promise.reject(this.humanizeError(error))
      }
    )
  }

  async signInEmailPassword(
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<any> {
    // https://firebase.google.com/docs/auth/web/auth-state-persistence
    let persistence = firebase.auth.Auth.Persistence.SESSION
    if (rememberMe) {
      persistence = firebase.auth.Auth.Persistence.LOCAL
    }

    await this.auth.setPersistence(persistence)

    await this.auth.signInWithEmailAndPassword(email, password).then(
      (userCredential: firebase.auth.UserCredential) => {
        // success
        console.log('User: ', userCredential.user.email)
        return
      },
      (error) => {
        // failure
        return Promise.reject(this.humanizeError(error))
      }
    )
  }

  /**
   * Sign-out user to landing page
   *
   * @memberof AuthService
   */
  signOut(redirect?: '/' | '/inactive') {
    // NOTE: see watch user to perform other
    // actions on signOut

    const self = this

    let _redirect = redirect

    // if no redirect is set default to home
    if (!redirect) {
      _redirect = '/'
    }

    // sign-out firebase session
    this.auth.signOut().then(() => {
      console.log('user now logged out')

      // redirect to homepage after user logs out
      self.ngZone.run(() => {
        self.router.navigate([_redirect]).then(() => {
          // reload forces services to reset data (eg: sessionService)
          // while not the ideal user experience this is critical to ensure
          // that the previous users session data is reset from browser memory
          this.windowService.windowRef.location.reload()
        })
      })
    })
  }

  /**
   * Generates an id to send to the back end to authenticate a request
   * against firebase when the identity of the user is needed to take
   * an action on the server side.
   *
   * @param {string} [institutionId]
   * @returns {Promise<string>}
   * @memberof AuthService
   */
  async getFirebaseAuthHeaders(): Promise<HttpHeaders> {
    // // usage:
    // const headers = await this.authService.getFirebaseAuthHeaders()
    // const r = new HttpRequest(
    //   'POST',
    //   `${environment.apiUrl}/account/create`,
    //   { headers: headers }
    // )
    // await this.http.request(r).toPromise()

    // au => temporary id for "authenticated user" ie: au
    const au = await (await this.auth.currentUser).getIdToken(
      /* forceRefresh */ true
    )

    // firebase auth id used by back-end to
    // determine the firebase user making the http request
    const h = new HttpHeaders().set('X-auth', au)
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    // h.append('X-auth', au);

    return h
  }

  /**
   * Used as middleware to do an action on sign-in and sign-out
   *
   * @private
   * @memberof AuthService
   */
  private watchUser() {
    // watch logged in user
    this.auth.onAuthStateChanged((user: UserInfo) => {
      if (user) {
        // this.auth.auth.currentUser.getIdToken(false).then((fid) => {
        //     console.log('fid', fid);
        // });

        this.startTimer()

        // login success, so remove error message if exists
        this.registrationError = ''
        this.loginError = ''

        // The signed-in user info
        console.log('Signed in: ', user.email)

        // tell angular about changes to detect
        // this.ngZone.run(() => {
        //     observer.next(user);
        // });
      } else {
        // clear inactivity timer by stopping
        this.stopTimer()

        // The signed-out user info.
        console.log('Signed out.')

        // tell angular about changes to detect
        // this.ngZone.run(() => {
        //     observer.next(null);
        // });

        // remove user session data
        this.userMeta = null

        // stop observable to watch user profile when the user logs out
        if (this.profileRef) {
          // if the profile ref is not null then stop observing
          // because it will start re-watching below
          this.profileRef.off()
        }

        // IMPORTANT: Better to handle navigation on SignOut()
        // so that navigation only occurs when user
        // clicks logout, instead of prompting the
        // user to login every time the user navigates to any page
      }
    })
  }

  private humanizeError(err: firebase.FirebaseError) {
    // If there is login error display the error message
    if (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this.loginError =
            'There already exists an account with the given email address.'
          break

        case 'auth/weak-password':
          this.loginError = 'The password is too weak.'
          break

        case 'auth/invalid-email':
          this.loginError = 'Email improperly formatted.'
          break

        case 'auth/user-disabled':
          this.loginError =
            'The user corresponding to the given email has been disabled by the system administrator.'
          break

        case 'auth/user-not-found':
          this.loginError = 'Invalid email or password.'
          break

        case 'auth/wrong-password':
          this.loginError = 'Invalid email or password.'
          break

        case 'auth/internal-error':
          // this typically fires when the user redirects back to the site
          // from the OAuth provider pop-up
          this.loginError = 'Internal login error. Try again later.'
          break

        default:
          // for all OAuth error messages show full message because user may
          // need to know detailed info as to why they weren't logged in
          this.loginError = err.message
          break
      }
    }

    console.log('login failure: ', this.loginError)

    return this.loginError
  }

  private loginRedirect() {
    // check if there is a route in query param to redirect
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // console.log('Query Params:', queryParams);

      if (queryParams['redirect']) {
        // if redirect query param is present
        this.router.navigate(queryParams['redirect'])
      } else {
        // if redirect query param is NOT present
        this.router.navigate(['/secure'])
      }
    })
  }

  // Inactivity:

  minutesDisplay = 0
  secondsDisplay = 0

  unsubscribe$: Subject<void> = new Subject()
  timerSubscription: Subscription

  // if the timer is started
  init: boolean

  _userActionOccurred: Subject<void> = new Subject()
  get userActionOccurred(): Observable<void> {
    return this._userActionOccurred.asObservable()
  }

  ngOnDestroy() {
    this.stopTimer()
  }

  notifyUserAction() {
    this._userActionOccurred.next()
  }

  startTimer() {
    // if timer is not initialized startTimer
    if (!this.init) {
      this.init = true

      this.resetInactivityTimer()
      this.userActionOccurred
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          if (this.timerSubscription) {
            this.timerSubscription.unsubscribe()
          }
          this.resetInactivityTimer()
        })
    }
  }

  stopTimer() {
    this.init = false
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  private resetInactivityTimer(endTime: number = environment.timeout) {
    const interval = 1000
    const duration = endTime * 60
    this.timerSubscription = timer(0, interval)
      .pipe(take(duration))
      .subscribe(
        (value) => this.render((duration - +value) * interval),
        (err) => {},
        () => {
          //  navigate to inactive page
          this.signOut('/inactive')
        }
      )
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count)
    this.minutesDisplay = this.getMinutes(count)
  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0)
    return this.pad(seconds)
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000)
    return this.pad(minutes)
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit
  }
}
