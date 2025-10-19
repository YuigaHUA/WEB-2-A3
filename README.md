# 🎗️ Charity Events Management System

## 📋 Project Overview
A comprehensive full-stack web application for managing charity events, featuring separate user client and admin panel with a shared backend API.

## 👥 Development Team

| Member | Primary Responsibility | Collaboration Area |
|--------|------------------------|-------------------|
| **Fan** | User Client (`client-side/`) | Backend API Development |
| **Jiang** | Admin Panel (`admin-side/`) | Backend API Development |

## 🏗️ System Architecture

### Frontend Applications
- **User Client** (`client-side/`) - Public-facing event portal (Fan)
- **Admin Panel** (`admin-side/`) - Management interface (Jiang)

### Backend Service  
- **API Server** (`backend-api/`) - Shared RESTful API (Both)

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 22.4
- **Angular CLI** 20.3.5
- **MySQL** 8.0+

### Installation & Setup

#### 1. Backend API (Collaborative)
```bash
cd backend-api
npm install
npm run dev
2. User Client (Fan)
bash
cd client-side
npm install
ng serve --port 4200
3. Admin Panel (Jiang)
bash
cd admin-side
npm install
ng serve --port 4201
Access URLs
User Client: http://localhost:4200
https://24516497.it.scu.edu.au/client/
https://24516646.it.scu.edu.au/client/

Admin Panel: http://localhost:4201
https://24516497.it.scu.edu.au/admin/
https://24516646.it.scu.edu.au/admin/

API: http://localhost:3000/api
https://24516497.it.scu.edu.au/DataServ_2/api
https://24516646.it.scu.edu.au/DataServ_2/api

📁 Frontend Implementation Details
User Client (client-side/) - Fan
🎯 Core Components
text
src/app/
├── components/
│   ├── event-list.component.ts/html/css      # Event browsing & search
│   ├── event-detail.component.ts/html/css    # Event details display
│   └── registration.component.ts/html/css    # Online registration
├── services/
│   └── event.service.ts                      # API communication
├── app.config.ts                             # Application configuration
├── app.routes.ts                             # Routing configuration
└── app.component.ts                          # Root component
🔧 Key Features
Event List Component: Browse and search charity events

Event Detail Component: View comprehensive event information

Registration Component: Simple and intuitive registration process

Event Service: Handles all API calls and data management

Admin Panel (admin-side/) - Jiang
🎯 Core Components
text
src/app/
├── components/
│   ├── dashboard.component.ts/html/css       # Analytics & overview
│   ├── event-list.component.ts/html/css      # Event management
│   └── event-form.component.ts/html/css      # Event CRUD operations
├── services/
│   └── admin.service.ts                      # Admin API communication
├── app.config.ts                             # Application configuration
├── app.routes.ts                             # Routing configuration
└── app.component.ts                          # Root component
🔧 Key Features
Dashboard Component: Real-time statistics and overview

Event List Component: Manage existing events

Event Form Component: Create and edit event details

Admin Service: Administrative API endpoints

🛠️ Technology Stack
Frontend
Framework: Angular 17 with Standalone Components

Language: TypeScript, HTML5, CSS3

Architecture: Component-based with Services

Routing: Angular Router

Backend
Runtime: Node.js + Express.js

Database: MySQL 8.0

API: RESTful Architecture

🎯 Core Features
User Client (Fan)
🔍 Event Discovery: Browse and search through event-list.component

📄 Event Details: Comprehensive view in event-detail.component

📝 Online Registration: Seamless registration via registration.component

🔄 Data Management: Centralized API calls in event.service

Admin Panel (Jiang)
📊 Analytics Dashboard: Overview and metrics in dashboard.component

⚡ Event Management: Full CRUD operations through event-list.component

✏️ Event Editing: Create/edit forms in event-form.component

🔧 Admin APIs: Specialized endpoints via admin.service

Shared Backend (Both)
🔐 Authentication & Authorization

📡 RESTful API Endpoints

💾 Database Operations

🛡️ Security & Validation

🔄 Development Workflow
Individual Focus
Fan: User experience, event browsing, registration flow

Jiang: Admin tools, event management, analytics

Collaboration Areas
Backend API design and implementation

Database schema and relationships

API contract agreements

Integration testing

📞 Support & Maintenance
Primary Contacts
User Client Issues: Fan

Admin Panel Issues: Jiang

Backend/API Issues: Both collaboratively
