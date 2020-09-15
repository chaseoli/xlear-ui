import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth-token',
  templateUrl: './auth-token.component.html',
  styleUrls: ['./auth-token.component.scss']
})
export class AuthTokenComponent implements OnInit {

  tempAuthToken: string

  constructor(
    public authService: AuthService
  ) { }

  async ngOnInit() {
   
    const h = await this.authService.getFirebaseAuthHeaders()
    this.tempAuthToken = h.get('x-Auth')
    
  }

}
