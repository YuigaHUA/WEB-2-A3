🎗️ Charity Events App
📖 Project Overview
A complete full-stack charity events management platform built with modular development approach, featuring clear separation between user client and admin panel with shared backend development.

👥 Development Team & Responsibilities
🎯 Development Approach
Member	Primary Focus	Collaborative Areas
Fan	User Client (client-side/)	Shared Backend (backend-api/)
Jiang	Admin Panel (admin-side/)	Shared Backend (backend-api/)
📋 Detailed Responsibilities
👤 Fan - User Client Specialist
Primary Focus: client-side/

Event browsing and search interface

Event details and information pages

Online registration forms and flows

User dashboard and registration history

Responsive mobile-first design

⚙️ Jiang - Admin Panel Specialist
Primary Focus: admin-side/

Event management CRUD interface

Data analytics and dashboard

Registration review and approval system

Bulk operations and administrative tools

🤝 Collaborative Backend (backend-api/)
Both Developers Work Together On:

Express.js server setup and configuration (server.js)

API route development and optimization

Database models and relationships

Authentication and authorization

Environment configuration (.env)

Package dependencies management (package.json)

Database schema design and migrations

🛠️ Technology Stack
Frontend Technologies
Framework: Angular 17 + Standalone Components

Language: TypeScript, HTML5, CSS3

State Management: RxJS, Services

Build Tool: Angular CLI

Backend Technologies (Collaborative)
Runtime: Node.js + Express.js (server.js)

Database: MySQL 8.0

API Design: RESTful Architecture

Environment: Environment variables (.env)

Package Management: npm (package.json)

Development Tools
Version Control: GitHub

Database Management: MySQL Workbench

API Testing: Postman

Deployment: cPanel

🚀 Core Features
User Client Module (Fan - client-side/)
✅ Event browsing and search

✅ Event details viewing

✅ Online event registration

✅ Registration record management

✅ Responsive mobile adaptation

Admin Panel Module (Jiang - admin-side/)
✅ Event CRUD management

✅ Data statistics dashboard

✅ User registration review

✅ System data monitoring

✅ Batch operation support

Shared Backend (Both - backend-api/)
✅ RESTful API development

✅ Database design and optimization

✅ Authentication system

✅ Error handling and validation

✅ Security implementation

📁 Project Structure
text
charity-event-app/
├── client-side/          # User Client Angular Application (Fan)
├── admin-side/           # Admin Panel Angular Application (Jiang)  
├── backend-api/          # Node.js Express API Service (Collaborative)
│   ├── node_modules/     # Dependencies
│   ├── .env             # Environment configuration
│   ├── .gitignore       # Git ignore rules
│   ├── package.json     # Project dependencies
│   ├── package-lock.json # Lock file
│   └── server.js        # Main server file
├── database/             # Database Schema & Initial Data
└── docs/                 # Project Documentation
🎯 Quick Start
Prerequisites
Node.js 18.0+

Angular CLI 17.0+

MySQL 8.0+

Local Development
Backend Setup (Collaborative)

bash
cd backend-api
npm install
# Configure .env file with database credentials
npm start
Client-side Setup (Fan)

bash
cd client-side
npm install
ng serve --port 4200
Admin-side Setup (Jiang)

bash
cd admin-side  
npm install
ng serve --port 4201
Access URLs
User Client: http://localhost:4200 (Fan)

Admin Panel: http://localhost:4201 (Jiang)

API Endpoint: http://localhost:3000/api

🔄 Development Workflow
Individual Focus Areas
Fan: Deep expertise in user experience and client-side functionality

Jiang: Specialization in administrative features and data management

Collaborative Development
Pair Programming: Work together on complex backend features

Code Reviews: Cross-review each other's backend contributions

API Design: Jointly design and implement API endpoints

Database Schema: Collaborative database design and optimization

Benefits of This Approach
Specialization: Each developer becomes expert in their domain

Collaboration: Shared backend knowledge prevents bottlenecks

Quality: Two sets of eyes on critical backend code

Learning: Knowledge sharing across frontend and backend

🚀 Deployment Strategy
Phase 1: Local development with shared backend

Phase 2: Integration testing between modules

Phase 3: Production deployment on cPanel

Phase 4: Performance monitoring and optimization

🤝 Contributing Guidelines
Fan: Primary maintainer for client-side/ features

Jiang: Primary maintainer for admin-side/ features

Both: Equal contributors to backend-api/ development

Regular sync-ups to coordinate API changes

Shared responsibility for database design
