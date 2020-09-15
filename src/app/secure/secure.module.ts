import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../shared/modules/auth.module';

@NgModule({
  declarations: [SecureComponent],
  entryComponents: [],
  providers: [],
  imports: [
    CommonModule,
    SecureRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
})
export class SecureModule {}
