import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService, Event } from '../services/admin.service';

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
    private readonly adminService: AdminService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载活动列表失败';
        this.loading = false;
        console.error('Error loading events:', error);
      }
    });
  }

  editEvent(eventId: number): void {
    this.router.navigate(['/events/edit', eventId]);
  }

  deleteEvent(eventId: number): void {
    if (confirm('确定要删除这个活动吗？此操作不可恢复。')) {
      this.adminService.deleteEvent(eventId).subscribe({
        next: (response) => {
          alert('活动删除成功');
          this.loadEvents(); // 重新加载列表
        },
        error: (error) => {
          alert('删除失败: ' + error.message);
          console.error('Delete error:', error);
        }
      });
    }
  }

  createNewEvent(): void {
    this.router.navigate(['/events/new']);
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

  isUpcoming(eventDate: string): boolean {
    return new Date(eventDate) > new Date();
  }
}