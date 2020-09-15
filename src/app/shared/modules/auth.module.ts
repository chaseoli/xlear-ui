import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { AuthCanActivateGuard, AuthRedirectCookie } from '../guards/auth.guard';
import { AuthResolver } from '../guards/auth.resolver';
import { UserService } from '../services/user.service';

/**
 * This shared module is used to import components and services related to managing users
 *
 * @export
 * @class UserModule
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule
    ],
    providers: [
        AngularFireAuth,
        AuthService,
        AuthCanActivateGuard,
        AuthRedirectCookie,
        AuthResolver,
        UserService
    ]
})
export class AuthModule { }
