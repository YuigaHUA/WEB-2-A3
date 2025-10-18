import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="admin-layout">
      <!-- 侧边栏导航 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>🤝 AdminSide</h2>
        </div>
        <nav class="sidebar-nav">
          <a (click)="navigateTo('/')" 
             class="nav-item" 
             [class.active]="isActiveRoute('/')">
            📊 仪表板
          </a>
          <a (click)="navigateTo('/events')" 
             class="nav-item" 
             [class.active]="isActiveRoute('/events')">
            📋 活动管理
          </a>
          <a (click)="navigateTo('/events/new')" 
             class="nav-item" 
             [class.active]="isActiveRoute('/events/new')">
            ➕ 创建活动
          </a>
        </nav>
        <div class="sidebar-footer">
          <a (click)="goToClient()" class="nav-item client-link">
            🌐 前往客户端
          </a>
        </div>
      </aside>

      <!-- 主内容区域 -->
      <main class="main-content">
        <header class="top-header">
          <h1>AdminSide</h1>
          <div class="user-info">
            <span>管理员</span>
          </div>
        </header>
        
        <div class="content-area">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .sidebar {
      width: 250px;
      background: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #34495e;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
    }

    .nav-item {
      display: block;
      color: #bdc3c7;
      text-decoration: none;
      padding: 12px 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: #34495e;
      color: white;
    }

    .nav-item.active {
      background: #34495e;
      color: white;
      border-left-color: #3498db;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid #34495e;
    }

    .client-link {
      background: #27ae60;
      color: white;
      border-radius: 6px;
      text-align: center;
      margin-top: 10px;
    }

    .client-link:hover {
      background: #219653;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .top-header {
      background: white;
      padding: 0 30px;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .top-header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .user-info {
      color: #7f8c8d;
      font-weight: 500;
    }

    .content-area {
      flex: 1;
      padding: 30px;
      overflow-y: auto;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
      .admin-layout {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        height: auto;
      }
      
      .sidebar-nav {
        display: flex;
        padding: 0;
      }
      
      .nav-item {
        flex: 1;
        text-align: center;
        border-left: none;
        border-bottom: 3px solid transparent;
      }
      
      .nav-item.active {
        border-left: none;
        border-bottom-color: #3498db;
      }
      
      .sidebar-footer {
        display: none;
      }
      
      .content-area {
        padding: 20px;
      }
      
      .top-header {
        padding: 0 20px;
        flex-direction: column;
        height: auto;
        padding: 15px 20px;
        gap: 10px;
      }
      
      .top-header h1 {
        font-size: 1.3rem;
      }
    }

    @media (max-width: 480px) {
      .sidebar-nav {
        flex-direction: column;
      }
    }
  `]
})
export class AppComponent {
  constructor(private readonly router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  isActiveRoute(path: string): boolean {
    return this.router.url === path || 
           (path !== '/' && this.router.url.startsWith(path));
  }

  goToClient(): void {
    window.open('http://localhost:4200', '_blank');
  }
}