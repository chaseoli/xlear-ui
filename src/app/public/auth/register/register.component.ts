import {
  Component,
  OnInit,
  HostBinding,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LodashService } from 'src/app/shared/services/lodash.service';

interface IEmailForm {
  email: string;
}

interface IPasswordForm {
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  ngOnInit() {}
}
