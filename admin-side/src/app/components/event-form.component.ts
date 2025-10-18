import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService, Category } from '../services/admin.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  categories: Category[] = [];
  loading = false;
  submitting = false;
  error = '';
  isEditMode = false;
  currentEventId: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      eventDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', [Validators.required]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    
    // 检查是否是编辑模式
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.isEditMode = true;
      this.currentEventId = Number.parseInt(eventId);
      this.loadEventData(this.currentEventId);
    }
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('加载类别失败:', error);
      }
    });
  }

  loadEventData(eventId: number): void {
    this.loading = true;
    this.adminService.getEventById(eventId).subscribe({
      next: (response) => {
        const event = response.data.event;
        
        // 格式化日期为 YYYY-MM-DDTHH:mm 格式
        const eventDate = new Date(event.eventDate);
        const formattedDate = eventDate.toISOString().slice(0, 16);
        
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          eventDate: formattedDate,
          location: event.location,
          price: event.price,
          categoryId: event.categoryId,
          imageUrl: event.imageUrl
        });
        
        this.loading = false;
      },
      error: (error) => {
        this.error = '加载活动数据失败';
        this.loading = false;
        console.error('Error loading event:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.submitting = true;
      this.error = '';

      const formData = this.eventForm.value;

      // 确保价格是数字
      formData.price = Number.parseFloat(formData.price);

      if (this.isEditMode && this.currentEventId) {
        // 更新现有活动
        this.adminService.updateEvent(this.currentEventId, formData).subscribe({
          next: (response) => {
            this.submitting = false;
            alert('活动更新成功！');
            this.router.navigate(['/events']);
          },
          error: (error) => {
            this.submitting = false;
            this.error = error.message;
            console.error('Update error:', error);
          }
        });
      } else {
        // 创建新活动
        this.adminService.createEvent(formData).subscribe({
          next: (response) => {
            this.submitting = false;
            alert('活动创建成功！');
            this.router.navigate(['/events']);
          },
          error: (error) => {
            this.submitting = false;
            this.error = error.message;
            console.error('Create error:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    for (const key of Object.keys(this.eventForm.controls)) {
  const control = this.eventForm.get(key);
  if (control) {
    control.markAsTouched();
  }
}
  }

  onCancel(): void {
    if (confirm('确定要取消吗？未保存的更改将会丢失。')) {
      this.router.navigate(['/events']);
    }
  }

  get f() {
    return this.eventForm.controls;
  }

  get pageTitle(): string {
    return this.isEditMode ? '编辑活动' : '创建新活动';
  }

 get submitButtonText(): string {
  return this.getButtonText();
}

private getButtonText(): string {
  if (this.submitting) {
    return this.isEditMode ? '更新中...' : '创建中...';
  } else {
    return this.isEditMode ? '更新活动' : '创建活动';
  }
}
}