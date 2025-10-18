import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService, Event } from '../services/event.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  event: Event | null = null;
  loading = true;
  submitting = false;
  error = '';
  success = false;
  
  registrationForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      specialRequirements: ['']
    });
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId) {
      this.loadEvent(Number.parseInt(eventId));
    } else {
      this.error = '活动ID无效';
      this.loading = false;
    }
  }

  loadEvent(eventId: number): void {
    this.loading = true;
    this.error = '';

    this.eventService.getEventById(eventId).subscribe({
      next: (response) => {
        this.event = response.data.event;
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载活动信息失败';
        this.loading = false;
        console.error('Error loading event:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid && this.event) {
      this.submitting = true;
      this.error = '';

      const formData = {
        eventId: this.event.eventId,
        ...this.registrationForm.value
      };

      this.eventService.registerEvent(formData).subscribe({
        next: (response) => {
          this.submitting = false;
          this.success = true;
          this.registrationForm.reset();
        },
        error: (error) => {
          this.submitting = false;
          this.error = error.message;
          console.error('Registration error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

 private markFormGroupTouched(): void {
  for (const key of Object.keys(this.registrationForm.controls)) {
    const control = this.registrationForm.get(key);
    control?.markAsTouched();
  }
}


  formatPrice(price: number): string {
    return price === 0 ? '免费' : `¥${price}`;
  }

  get f() {
    return this.registrationForm.controls;
  }
}