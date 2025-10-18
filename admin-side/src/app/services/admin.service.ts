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

export interface Category {
  category_id: number;
  category_name: string;
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
export class AdminService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) { }

  // 获取所有活动
  getEvents(): Observable<ApiResponse<Event[]>> {
    return this.http.get<ApiResponse<Event[]>>(`${this.apiUrl}/events`)
      .pipe(catchError(this.handleError));
  }

  // 获取单个活动详情
  getEventById(eventId: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/events/${eventId}`)
      .pipe(catchError(this.handleError));
  }

  // 创建新活动
  createEvent(eventData: any): Observable<ApiResponse<{ eventId: number }>> {
    return this.http.post<ApiResponse<{ eventId: number }>>(
      `${this.apiUrl}/events`,
      eventData
    ).pipe(catchError(this.handleError));
  }

  // 更新活动
  updateEvent(eventId: number, eventData: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.apiUrl}/events/${eventId}`,
      eventData
    ).pipe(catchError(this.handleError));
  }

  // 删除活动
  deleteEvent(eventId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.apiUrl}/events/${eventId}`
    ).pipe(catchError(this.handleError));
  }

  // 获取所有类别
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '发生未知错误';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `错误: ${error.error.message}`;
    } else {
      errorMessage = error.error?.error || `服务器错误 ${error.status}: ${error.message}`;
    }
    
    console.error('Admin API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}