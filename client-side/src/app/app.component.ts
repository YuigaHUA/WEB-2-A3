import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="app-header">
      <div class="container">
        <nav class="navbar">
          <div class="nav-brand">
            <h1>🤝 慈善活动平台</h1>
          </div>
          <div class="nav-links">
            <a (click)="goToHome()" class="nav-link">活动列表</a>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-outlet />
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2024 慈善活动平台. 所有权利保留.</p>
      </div>
    </footer>
  `,
  styles: [`
    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 5px;
      transition: background 0.3s ease;
      cursor: pointer;
      display: inline-block;
    }
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .main-content {
      min-height: calc(100vh - 140px);
      background: #f8f9fa;
    }
    .app-footer {
      background: #2c3e50;
      color: white;
      text-align: center;
      padding: 20px 0;
    }
    .app-footer p {
      margin: 0;
      color: #bdc3c7;
    }
  `]
})
export class AppComponent {
  title = '慈善活动平台';

  constructor(private readonly router: Router) {}

  goToHome(): void {
    console.log('点击了活动列表按钮！');
    
    // 强制重新加载首页
    this.router.navigateByUrl('/', { skipLocationChange: false });
  }
}