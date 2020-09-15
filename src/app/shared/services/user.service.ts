import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { IPerson } from '../models/user'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  update(person: IPerson) {
    return this.http.post(`${environment.apiUrl}/user`, person)
  }

  getByUid(uid: string) {
    return this.http.get<IPerson>(`${environment.apiUrl}/user/${uid}`)
  }
}
