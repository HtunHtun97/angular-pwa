import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  api: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
  }
}