import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Event {
  eventId: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  registrationCount: number;
  createdAt: string;
}

export interface Registration {
  registrationId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  ticketQuantity: number;
  registrationDate: string;
  specialRequirements: string;
}

export interface EventDetail {
  event: Event;
  registrations: Registration[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) { }

  getEvents(): Observable<ApiResponse<Event[]>> {
    return this.http.get<ApiResponse<Event[]>>(`${this.apiUrl}/events`)
      .pipe(catchError(this.handleError));
  }

  getEventById(eventId: number): Observable<ApiResponse<EventDetail>> {
    return this.http.get<ApiResponse<EventDetail>>(`${this.apiUrl}/events/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  registerEvent(registrationData: {
    eventId: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    ticketQuantity: number;
    specialRequirements: string;
  }): Observable<ApiResponse<{ registrationId: number }>> {
    return this.http.post<ApiResponse<{ registrationId: number }>>(
      `${this.apiUrl}/registrations`,
      registrationData
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '发生未知错误';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `错误: ${error.error.message}`;
    } else {
      errorMessage = error.error?.error || `服务器错误 ${error.status}: ${error.message}`;
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}