import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from './car';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient,
  ) { }

  private Url = 'http://localhost:3000/cars';

  //get all cars
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.Url)
    .pipe(
      catchError(this.handleError<Car[]>('getCars', [])),
      retry(1)
    );
  }
  //get car with specific id
  getCar(id: string): Observable<Car> {
    const url = `${this.Url}/${id}`;
    return this.http.get<Car>(url)
    .pipe(
      catchError(this.handleError<Car>(`getCar id=${id}`)),
      retry(1)
    );

  }

  searchCars(term: string): Observable<Car[]> {
    if (!term.trim()) {
      // if not search term, return empty car array.
      return of([]);
    }
    return this.http.get<Car[]>(`${this.Url}/?name_like=${term}`).pipe(
      tap(x => x.length ? 
        console.log(` matching "${term}"`) :
        console.log(`no matching "${term}"`)),
      catchError(this.handleError<Car[]>('searching', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
