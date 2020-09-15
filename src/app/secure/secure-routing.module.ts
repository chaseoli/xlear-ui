import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthResolver } from '../shared/guards/auth.resolver'
import { AuthCanActivateGuard } from '../shared/guards/auth.guard'
import { SessionResolver } from '../shared/guards/session.resolver'
import { AuthTokenComponent } from './auth-token/auth-token.component'
import { SecureComponent } from './secure.component'

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    resolve: [AuthResolver, SessionResolver],
    canActivate: [AuthCanActivateGuard],
    children: [
      { path: '', redirectTo: 'auth' },
      { path: 'auth', component: AuthTokenComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}
