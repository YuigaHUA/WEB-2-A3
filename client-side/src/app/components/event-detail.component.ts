import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EventService, EventDetail } from '../services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  eventDetail: EventDetail | null = null;
  loading = true;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetail(Number.parseInt(eventId));
    } else {
      this.error = '活动ID无效';
      this.loading = false;
    }
  }

  loadEventDetail(eventId: number): void {
    this.loading = true;
    this.error = '';

    this.eventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.eventDetail = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载活动详情失败';
        this.loading = false;
        console.error('Error loading event detail:', error);
      }
    });
  }

  registerForEvent(): void {
    if (this.eventDetail) {
      this.router.navigate(['/register', this.eventDetail.event.eventId]);
    }
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