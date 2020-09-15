import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicComponent } from './public.component';
import { InactiveComponent } from './inactive/inactive.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { RecoverComponent } from './auth/recover/recover.component';
import { LodashService } from '../shared/services/lodash.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthResolver } from '../shared/guards/auth.resolver';
import { AuthModule } from '../shared/modules/auth.module';
import { SessionService } from '../shared/services/session.service';
import { SessionResolver } from '../shared/guards/session.resolver';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    NotFoundComponent,
    InactiveComponent,
    RegisterComponent,
    LoginComponent,
    ResetComponent,
    RecoverComponent,
    ArticleLayoutComponent,
  ],
  providers: [LodashService, AuthResolver, SessionService, SessionResolver],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    AuthModule,
  ],
})
export class PublicModule {}
