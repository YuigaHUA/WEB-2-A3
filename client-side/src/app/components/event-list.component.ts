import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService, Event } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error = '';

  constructor(
    private readonly eventService: EventService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';

    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载活动列表失败，请稍后重试';
        this.loading = false;
        console.error('Error loading events:', error);
      }
    });
  }

  viewEventDetails(eventId: number): void {
    this.router.navigate(['/event', eventId]);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(price: number): string {
    return price === 0 ? '免费' : `¥${price}`;
  }
}