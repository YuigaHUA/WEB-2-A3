# 🔗 API Documentation

## 📋 Overview
This document describes the RESTful API endpoints for the Charity Events Management Platform. All endpoints return JSON responses and follow consistent error handling patterns.

## 🔧 Base Information
- **Base URL**: `http://localhost:3000/api`
- **Authentication**: None required (development version)
- **Content Type**: `application/json`
- **Response Format**: Standardized JSON with success status

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "count": 10,
  "message": "Operation completed successfully"
}
Error Response
json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly error message"
}
🎯 Event Endpoints
Get All Events
GET /events

Retrieves a list of all charity events with registration counts.

Response:

json
{
  "success": true,
  "data": [
    {
      "eventId": 1,
      "title": "Beach Cleanup Day",
      "description": "Join us for a community beach cleanup to protect marine life...",
      "eventDate": "2025-03-15T09:00:00.000Z",
      "location": "Sunshine Beach",
      "price": 0.00,
      "imageUrl": null,
      "categoryName": "Environmental Protection",
      "registrationCount": 2,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 8
}
Get Event by ID
GET /events/:id

Retrieves detailed information about a specific event including all registrations.

Parameters:

id (path parameter) - Event ID

Response:

json
{
  "success": true,
  "data": {
    "event": {
      "eventId": 1,
      "title": "Beach Cleanup Day",
      "description": "Join us for a community beach cleanup...",
      "eventDate": "2025-03-15T09:00:00.000Z",
      "location": "Sunshine Beach",
      "price": 0.00,
      "imageUrl": null,
      "categoryName": "Environmental Protection",
      "categoryId": 1,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "registrations": [
      {
        "registrationId": 1,
        "userName": "John Smith",
        "userEmail": "john.smith@email.com",
        "userPhone": "+1234567890",
        "ticketQuantity": 2,
        "registrationDate": "2024-01-16T08:15:00.000Z",
        "specialRequirements": "Bringing my own gloves"
      }
    ]
  }
}
Error Responses:

404 Not Found - Event does not exist

400 Bad Request - Invalid event ID format

Create New Event
POST /events

Creates a new charity event.

Request Body:

json
{
  "title": "Community Garden Planting",
  "description": "Help us plant vegetables in the community garden...",
  "eventDate": "2025-04-20T09:00:00.000Z",
  "location": "Community Garden Center",
  "price": 0.00,
  "categoryId": 1,
  "imageUrl": "https://example.com/garden.jpg"
}
Required Fields:

title (string, min 5 characters)

description (string, min 20 characters)

eventDate (ISO 8601 date string)

location (string)

price (number, default 0.00)

categoryId (number, must exist in categories table)

Response:

json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "eventId": 9
  }
}
Error Responses:

400 Bad Request - Missing or invalid required fields

500 Internal Server Error - Database error

Update Event
PUT /events/:id

Updates an existing event.

Parameters:

id (path parameter) - Event ID to update

Request Body: (Same as POST /events)

Response:

json
{
  "success": true,
  "message": "Event updated successfully"
}
Error Responses:

404 Not Found - Event does not exist

400 Bad Request - Invalid input data

Delete Event
DELETE /events/:id

Deletes an event if it has no registrations.

Parameters:

id (path parameter) - Event ID to delete

Response:

json
{
  "success": true,
  "message": "Event deleted successfully"
}
Error Responses:

404 Not Found - Event does not exist

409 Conflict - Event has existing registrations

400 Bad Request - Invalid event ID

👥 Registration Endpoints
Register for Event
POST /registrations

Registers a user for a specific event.

Request Body:

json
{
  "eventId": 1,
  "userName": "Jane Doe",
  "userEmail": "jane.doe@email.com",
  "userPhone": "+1234567891",
  "ticketQuantity": 2,
  "specialRequirements": "Vegetarian meal option"
}
Required Fields:

eventId (number, must exist)

userName (string, min 2 characters)

userEmail (string, valid email format)

ticketQuantity (number, min 1, max 10)

Response:

json
{
  "success": true,
  "message": "Registration completed successfully",
  "data": {
    "registrationId": 25
  }
}
Error Responses:

400 Bad Request - Missing or invalid required fields

409 Conflict - Email already registered for this event

404 Not Found - Event does not exist

📂 Category Endpoints
Get All Categories
GET /categories

Retrieves all available event categories.

Response:

json
{
  "success": true,
  "data": [
    {
      "category_id": 1,
      "category_name": "Environmental Protection"
    },
    {
      "category_id": 2,
      "category_name": "Education Support"
    }
  ]
}
🩺 Health Check Endpoint
Service Health
GET /health

Checks if the API service is running properly.

Response:

json
{
  "status": "OK",
  "timestamp": "2024-01-16T10:30:00.000Z",
  "service": "Charity Events API"
}
⚠️ Error Handling
Common HTTP Status Codes
200 OK - Successful request

201 Created - Resource created successfully

400 Bad Request - Invalid input parameters

404 Not Found - Resource does not exist

409 Conflict - Business rule violation (e.g., duplicate registration)

500 Internal Server Error - Server-side error

Error Response Format
All error responses follow this structure:

json
{
  "success": false,
  "error": "Detailed error description for debugging",
  "message": "User-friendly error message"
}
🔒 Security Notes
All endpoints are publicly accessible in this development version

Input validation is performed on all user-provided data

SQL injection protection through parameterized queries

CORS configured for frontend development origins

🚦 Rate Limiting
No rate limiting implemented in development version.

📝 Example Usage
JavaScript Fetch Example
javascript
// Get all events
const response = await fetch('http://localhost:3000/api/events');
const data = await response.json();

if (data.success) {
  console.log('Events:', data.data);
} else {
  console.error('Error:', data.error);
}

// Register for an event
const registrationData = {
  eventId: 1,
  userName: "John Smith",
  userEmail: "john@example.com",
  userPhone: "+1234567890",
  ticketQuantity: 2
};

const registerResponse = await fetch('http://localhost:3000/api/registrations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(registrationData)
});

const result = await registerResponse.json();
cURL Examples
bash
# Get all events
curl -X GET http://localhost:3000/api/events

# Create new event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Charity Event",
    "description": "Event description here...",
    "eventDate": "2025-05-01T10:00:00.000Z",
    "location": "Event Location",
    "price": 0.00,
    "categoryId": 1
  }'

# Register for event
curl -X POST http://localhost:3000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "userName": "Test User",
    "userEmail": "test@example.com",
    "ticketQuantity": 1
  }'