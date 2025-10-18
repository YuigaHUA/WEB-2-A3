# 🎗️ Charity Events App

## 📖 Project Overview
A complete full-stack charity events management platform built with a frontend-backend separation architecture, featuring both user client and administrator backend systems.

## 👥 Development Team
| Member | Role | Key Contributions |
|--------|------|-------------------|
| Fan | Frontend Full-Stack Engineer | Angular client-side & admin-side development, UI/UX design, responsive layout |
| jiang | Backend Full-Stack Engineer | Node.js API development, database design, system architecture, deployment |

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework**: Angular 17 + Standalone Components
- **Language**: TypeScript, HTML5, CSS3
- **State Management**: RxJS, Services
- **Build Tool**: Angular CLI

### Backend Technologies  
- **Runtime**: Node.js + Express.js
- **Database**: MySQL 8.0
- **API Design**: RESTful Architecture
- **Security**: CORS, Data Validation

### Development Tools
- **Version Control**: GitHub
- **Database Management**: MySQL Workbench
- **API Testing**: Postman
- **Deployment**: cPanel

## 🚀 Core Features

### User Client 🌐
- ✅ Event browsing and search
- ✅ Event details viewing
- ✅ Online event registration
- ✅ Registration record management
- ✅ Responsive mobile adaptation

### Admin Panel ⚙️  
- ✅ Event CRUD management
- ✅ Data statistics dashboard
- ✅ User registration review
- ✅ System data monitoring
- ✅ Batch operation support

## 📁 Project Structure
charity-event-app/
├── client-side/ # User Client Angular Application
├── admin-side/ # Admin Panel Angular Application
├── backend-api/ # Node.js Express API Service
├── database/ # Database Schema & Initial Data
└── docs/ # Project Documentation & Deployment Guides
## 🎯 Quick Start

### Prerequisites
- Node.js 18.0+
- Angular CLI 17.0+
- MySQL 8.0+

### Local Development
1. **Backend Setup**
bash
   cd backend-api
   npm install
   npm run dev

**Client-side Setup**

bash
  cd client-side
  npm install
  ng serve --port 4200

**Admin-side Setup**

bash
  cd admin-side  
  npm install
  ng serve --port 4201

**Access URLs**

User Client: http://localhost:4200

Admin Panel: http://localhost:4201

API Endpoint: http://localhost:3000/api

**📊 Database Design**
The system includes 3 core data tables:

events - Event information table

registrations - Event registration table

event_categories - Event categories table

Refer to documents in database/ directory for detailed ER diagram.


**🤝 Contributing**
Issues and Pull Requests are welcome!
