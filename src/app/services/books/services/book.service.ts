import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Book } from '../../../models/models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {  
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=fouling&maxResults=12&startIndex=0';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.items || []),
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Failed to load books'));
      })
    );
  }
}