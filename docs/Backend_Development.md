
## 📄 **docs/Backend_Development.md**

```markdown
# 🔧 Backend Development Documentation

## 👨‍💻 Developer: jiang
**Role:** Backend Full-Stack Engineer

## 📋 Responsibilities
- ✅ Node.js Express API server development
- ✅ MySQL database design and optimization
- ✅ RESTful API interface design and implementation
- ✅ Data validation and security handling
- ✅ Server deployment and performance optimization

## 🏗️ Architecture Overview

### Technology Stack
- **Runtime:** Node.js + Express.js
- **Database:** MySQL 8.0
- **API Design:** RESTful Architecture
- **Security:** CORS, Input Validation, SQL Injection Protection
- **Environment:** Dotenv for configuration management

### Project Structure
backend-api/
├── server.js # Main server entry point
├── package.json # Dependencies and scripts
├── config/
│ └── database.js # Database configuration
├── .env # Environment variables
└── .gitignore

database/
├── charity_events.sql # Complete database schema
├── initial_data.sql # Sample data population
└── table_design.md # Database design documentation
## 🗄️ Database Design

### Schema Overview
```sql
-- Core table: Events
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    location VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    category_id INT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES event_categories(category_id) ON DELETE SET NULL
);

-- Core table: Registrations
CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150) NOT NULL,
    user_phone VARCHAR(20),
    ticket_quantity INT NOT NULL DEFAULT 1,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    special_requirements TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_email (event_id, user_email),
    CHECK (ticket_quantity > 0)
);

-- Core table: Event Categories
CREATE TABLE event_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Sample Data
sql
-- Initial categories
INSERT INTO event_categories (category_name) VALUES 
('Environmental Protection'),
('Education Support'), 
('Medical Assistance'),
('Community Service'),
('Disaster Relief'),
('Animal Welfare');

-- Sample events with 2025 dates
INSERT INTO events (title, description, event_date, location, price, category_id) VALUES
('Beach Cleanup Day', 'Join us for a community beach cleanup...', '2025-03-15 09:00:00', 'Sunshine Beach', 0.00, 1),
('Mountain Teaching Volunteer', 'Volunteer to teach children...', '2025-03-20 08:00:00', 'Hope Primary School', 50.00, 2);
🔌 API Implementation
Server Configuration
javascript
// server.js - Main server setup
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware configuration
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'charity_events',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
Core API Endpoints
Events Management
javascript
// GET /api/events - Get all events
app.get('/api/events', (req, res) => {
    const sql = `
        SELECT 
            e.event_id, e.title, e.description, e.event_date,
            e.location, e.price, e.image_url, e.created_at,
            ec.category_name,
            COUNT(r.registration_id) as registration_count
        FROM events e
        LEFT JOIN event_categories ec ON e.category_id = ec.category_id
        LEFT JOIN registrations r ON e.event_id = r.event_id
        GROUP BY e.event_id
        ORDER BY e.event_date ASC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                error: 'Failed to fetch events' 
            });
        }
        
        res.json({
            success: true,
            data: results,
            count: results.length
        });
    });
});

// POST /api/events - Create new event
app.post('/api/events', (req, res) => {
    const { title, description, eventDate, location, price, categoryId } = req.body;
    
    // Input validation
    if (!title || !description || !eventDate || !location) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields'
        });
    }

    const sql = `
        INSERT INTO events (title, description, event_date, location, price, category_id) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [title, description, eventDate, location, price, categoryId];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: 'Failed to create event'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: { eventId: result.insertId }
        });
    });
});
Registration System
javascript
// POST /api/registrations - Register for event
app.post('/api/registrations', (req, res) => {
    const { eventId, userName, userEmail, userPhone, ticketQuantity } = req.body;
    
    // Validation
    if (!eventId || !userName || !userEmail || !ticketQuantity) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields'
        });
    }

    if (ticketQuantity < 1) {
        return res.status(400).json({
            success: false,
            error: 'Ticket quantity must be at least 1'
        });
    }

    const sql = `
        INSERT INTO registrations (event_id, user_name, user_email, user_phone, ticket_quantity) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [eventId, userName, userEmail, userPhone, ticketQuantity];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    success: false,
                    error: 'This email is already registered for the event'
                });
            }
            return res.status(500).json({
                success: false,
                error: 'Failed to register for event'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Registration completed successfully',
            data: { registrationId: result.insertId }
        });
    });
});
🔒 Security Implementation
CORS Configuration
javascript
// Secure CORS setup for development and production
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:4200',
            'http://localhost:4201', 
            'http://localhost:4202'
        ];
        
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
Input Validation
javascript
// Comprehensive input validation for all endpoints
const validateEventData = (data) => {
    const errors = [];
    
    if (!data.title || data.title.length < 5) {
        errors.push('Title must be at least 5 characters');
    }
    
    if (!data.description || data.description.length < 20) {
        errors.push('Description must be at least 20 characters');
    }
    
    if (!data.eventDate || isNaN(new Date(data.eventDate).getTime())) {
        errors.push('Valid event date is required');
    }
    
    return errors;
};
🚀 Deployment Configuration
Environment Variables
env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=charity_events

# Server Configuration
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200,http://localhost:4201
Production Setup
bash
# Install production dependencies
npm install --production

# Start production server
npm start

# Using PM2 for process management
pm2 start server.js --name charity-api
📊 Performance Optimizations
Database Optimization
Connection pooling for efficient MySQL connections

Indexed foreign keys for faster joins

Properly normalized schema to reduce redundancy

API Optimization
Efficient SQL queries with proper indexing

Response compression for large datasets

Proper HTTP status codes and error handling

🔧 Technical Challenges & Solutions
Challenge 1: Database Connection Management
Problem: Managing MySQL connections efficiently across multiple requests.

Solution: Implemented connection pooling with proper error handling and connection limits.

Challenge 2: Data Integrity
Problem: Ensuring data consistency with foreign key constraints and unique indexes.

Solution: Implemented comprehensive database constraints and proper error handling for constraint violations.

Challenge 3: API Security
Problem: Protecting against common web vulnerabilities.

Solution: Implemented CORS, input validation, and SQL injection protection through parameterized queries.