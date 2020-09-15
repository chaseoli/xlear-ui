import {
  Component,
  OnInit,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LodashService } from 'src/app/shared/services/lodash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  hidePasswordForm = true;
  passwordHideText = true;
  loginAttemptInProgress = false;

  emailForm: FormGroup;
  passwordForm: FormGroup;

  emailControl: FormControl;
  passwordControl: FormControl;
  rememberMeControl: FormControl;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private _: LodashService,
    private router: Router
  ) {}

  @HostBinding('attr.class') cls = 'flex-fill';
  @ViewChild('password') passwordElement: ElementRef;
  @ViewChild('email') emailElement: ElementRef;

  ngOnInit() {
    // check if firebase user exists
    if (
      !this._._.isEmpty(this._._.get(this.authService, 'auth.auth.currentUser'))
    ) {
      this.redirect();
    } else {
      this.initForms();
    }
  }

  ngAfterViewInit(): void {
    this.emailElement.nativeElement.focus();
    this.emailElement.nativeElement.select();
  }

  initForms() {
    // create form controls:
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordControl = new FormControl('', [Validators.required]);

    this.rememberMeControl = new FormControl(true, [Validators.required]);

    // create forms:
    this.emailForm = new FormGroup({
      email: this.emailControl,
      rememberMeControl: this.rememberMeControl,
    });

    this.passwordForm = new FormGroup({
      password: this.passwordControl,
    });
  }

  getEmailErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Required';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmitEmail() {
    if (this.emailForm.valid) {
      // show password form
      this.hidePasswordForm = false;

      // on transition to the next form select the password field
      setTimeout(() => {
        this.passwordElement.nativeElement.focus();
        this.passwordElement.nativeElement.select();
      }, 0);
    }
  }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      this.loginAttemptInProgress = true;

      // console.log('formData', formData)

      this.authService
        .signInEmailPassword(
          // remove whitespace and convert to lowercase text if needed for email
          this.emailControl.value.trim().toLocaleLowerCase(),
          this.passwordControl.value,
          this.rememberMeControl.value
        )
        .then(
          () => {
            this.redirect();
          },
          (errorMsg) => {
            // clear password field on error
            this.passwordForm.get('password').reset();
            // this.passwordControl.hasError('password') ? 'Incorrect password. Try again.' : '';
            this.passwordControl.hasError('password') ? errorMsg : '';
            this.loginAttemptInProgress = false;
            this.hidePasswordForm = true;
          }
        );
    }
  }

  redirect() {
    // user already logged in so redirect
    this.router.navigate(['/secure']);
  }
}
