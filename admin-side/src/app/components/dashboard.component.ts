import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService, Event } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  stats = {
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0
  };

  constructor(
    private readonly adminService: AdminService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.adminService.getEvents().subscribe({
      next: (response) => {
        this.events = response.data;
        this.calculateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('加载数据失败:', error);
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    this.stats.totalEvents = this.events.length;
    this.stats.totalRegistrations = this.events.reduce((sum, event) => sum + event.registrationCount, 0);
    this.stats.upcomingEvents = this.events.filter(event => 
      new Date(event.eventDate) > new Date()
    ).length;
  }

  navigateToEvents(): void {
    this.router.navigate(['/events']);
  }

  navigateToNewEvent(): void {
    this.router.navigate(['/events/new']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('zh-CN');
  }
}