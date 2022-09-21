import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { SavedComparison } from '../models/comparison';

@Injectable({
  providedIn: 'root',
})
export class ComparisonService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/v1';
  }

  compareTexts(text1: string, text2: string): Observable<object> {
    if (!text1 || !text2) {
      return throwError(
        () => '[comparison.service]: not texts provided correctly'
      );
    }

    return this.http.post(`${this.baseUrl}/compare`, { text1, text2 });
  }

  getTextComparisons(): Observable<object> {
    return this.http.get(`${this.baseUrl}/comparisons`);
  }
}
