import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './user/user.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  api: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  getUser<Data>(id: number | string): Observable<User> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const url = `${this.api}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => users[0]), // returns a {0|1} element array
      tap((u) => {
        const outcome = u ? `fetched` : `did not find`;
        this.log(`${outcome} user id=${id}`);
      }),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }

  private log(message: string) {
    console.log('RestService: ' + message);
  }
}
