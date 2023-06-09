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

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.Url, {headers: {}})
    .pipe(
      retry(1)
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
