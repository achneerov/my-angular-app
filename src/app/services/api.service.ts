import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  checkAvailability(inputString: string): Observable<{ status: string }> {
    const url = `${this.apiUrl}/checkAvailability/${inputString}`;
    return this.http.get<{ status: string }>(url);
  }
}
