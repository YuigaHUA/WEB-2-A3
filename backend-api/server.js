require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 创建数据库连接池
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'charity_events',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试数据库连接
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ 数据库连接失败:', err.message);
        process.exit(1);
    }
    console.log('✅ 成功连接到MySQL数据库');
    connection.release();
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Charity Events API'
    });
});

// 获取所有活动
app.get('/api/events', (req, res) => {
    const sql = `
        SELECT 
            e.event_id,
            e.title,
            e.description,
            e.event_date,
            e.location,
            e.price,
            e.image_url,
            e.created_at,
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
            console.error('❌ 获取活动列表错误:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch events',
                details: err.message 
            });
        }
        
        // 转换数据格式
        const events = results.map(event => ({
            eventId: event.event_id,
            title: event.title,
            description: event.description,
            eventDate: event.event_date,
            location: event.location,
            price: Number.parseFloat(event.price),
            imageUrl: event.image_url,
            categoryName: event.category_name,
            registrationCount: event.registration_count,
            createdAt: event.created_at
        }));
        
        res.json({
            success: true,
            data: events,
            count: events.length
        });
    });
});

// 获取单个活动详情
app.get('/api/events/:eventId', (req, res) => {
    const eventId = Number.parseInt(req.params.eventId);
    
    if (Number.isNaN(eventId) || eventId <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid event ID'
        });
    }

    // 获取活动基本信息
    const eventSql = `
        SELECT 
            e.event_id,
            e.title,
            e.description,
            e.event_date,
            e.location,
            e.price,
            e.image_url,
            e.created_at,
            ec.category_name,
            ec.category_id
        FROM events e
        LEFT JOIN event_categories ec ON e.category_id = ec.category_id
        WHERE e.event_id = ?
    `;

    // 获取活动注册记录
    const registrationsSql = `
        SELECT 
            registration_id,
            user_name,
            user_email,
            user_phone,
            ticket_quantity,
            registration_date,
            special_requirements
        FROM registrations 
        WHERE event_id = ? 
        ORDER BY registration_date DESC
    `;

    // 并行查询活动信息和注册记录
    db.query(eventSql, [eventId], (err, eventResults) => {
        if (err) {
            console.error('❌ 获取活动详情错误:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch event details'
            });
        }

        if (eventResults.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        const event = eventResults[0];

        db.query(registrationsSql, [eventId], (err, registrationResults) => {
            if (err) {
                console.error('❌ 获取注册记录错误:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to fetch registration records'
                });
            }

            // 构建响应数据
            const responseData = {
                event: {
                    eventId: event.event_id,
                    title: event.title,
                    description: event.description,
                    eventDate: event.event_date,
                    location: event.location,
                    price: Number.parseFloat(event.price),
                    imageUrl: event.image_url,
                    categoryName: event.category_name,
                    categoryId: event.category_id,
                    createdAt: event.created_at
                },
                registrations: registrationResults.map(reg => ({
                    registrationId: reg.registration_id,
                    userName: reg.user_name,
                    userEmail: reg.user_email,
                    userPhone: reg.user_phone,
                    ticketQuantity: reg.ticket_quantity,
                    registrationDate: reg.registration_date,
                    specialRequirements: reg.special_requirements
                }))
            };

            res.json({
                success: true,
                data: responseData
            });
        });
    });
});

// 创建新活动
app.post('/api/events', (req, res) => {
    const { title, description, eventDate, location, price, categoryId, imageUrl } = req.body;

    // 验证必需字段
    if (!title || !description || !eventDate || !location) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: title, description, eventDate, location'
        });
    }

    const sql = `
        INSERT INTO events (title, description, event_date, location, price, category_id, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title.trim(),
        description.trim(),
        new Date(eventDate),
        location.trim(),
        Number.parseFloat(price) || 0.00,
        categoryId ? Number.parseInt(categoryId) : null,
        imageUrl || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ 创建活动错误:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to create event'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: {
                eventId: result.insertId
            }
        });
    });
});

// 更新活动
app.put('/api/events/:eventId', (req, res) => {
    const eventId = Number.parseInt(req.params.eventId);
    const { title, description, eventDate, location, price, categoryId, imageUrl } = req.body;

    if (Number.isNaN(eventId) || eventId <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid event ID'
        });
    }

    const sql = `
        UPDATE events 
        SET title = ?, description = ?, event_date = ?, location = ?, price = ?, category_id = ?, image_url = ?
        WHERE event_id = ?
    `;

    const values = [
        title?.trim(),
        description?.trim(),
        eventDate ? new Date(eventDate) : null,
        location?.trim(),
        price ? Number.parseFloat(price) : 0.00,
        categoryId ? Number.parseInt(categoryId) : null,
        imageUrl,
        eventId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ 更新活动错误:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to update event'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        res.json({
            success: true,
            message: 'Event updated successfully'
        });
    });
});

// 删除活动
app.delete('/api/events/:eventId', (req, res) => {
    const eventId = Number.parseInt(req.params.eventId);

    if (Number.isNaN(eventId) || eventId <= 0) {
        return res.status(400).json({
            success: false,
            error: 'Invalid event ID'
        });
    }

    // 首先检查是否有注册记录
    const checkSql = 'SELECT COUNT(*) as regCount FROM registrations WHERE event_id = ?';

    db.query(checkSql, [eventId], (err, results) => {
        if (err) {
            console.error('❌ 检查注册记录错误:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to check event registrations'
            });
        }

        const regCount = results[0].regCount;

        if (regCount > 0) {
            return res.status(409).json({
                success: false,
                error: `Cannot delete event with ${regCount} registration(s). Please remove all registrations first.`
            });
        }

        // 没有注册记录，可以删除
        const deleteSql = 'DELETE FROM events WHERE event_id = ?';

        db.query(deleteSql, [eventId], (err, result) => {
            if (err) {
                console.error('❌ 删除活动错误:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to delete event'
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found'
                });
            }

            res.json({
                success: true,
                message: 'Event deleted successfully'
            });
        });
    });
});

// 注册活动
app.post('/api/registrations', (req, res) => {
    const { eventId, userName, userEmail, userPhone, ticketQuantity, specialRequirements } = req.body;

    // 验证必需字段
    if (!eventId || !userName || !userEmail || !ticketQuantity) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: eventId, userName, userEmail, ticketQuantity'
        });
    }

    if (ticketQuantity < 1) {
        return res.status(400).json({
            success: false,
            error: 'Ticket quantity must be at least 1'
        });
    }

    const sql = `
        INSERT INTO registrations (event_id, user_name, user_email, user_phone, ticket_quantity, special_requirements) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        Number.parseInt(eventId),
        userName.trim(),
        userEmail.trim().toLowerCase(),
        userPhone?.trim() || null,
        Number.parseInt(ticketQuantity),
        specialRequirements?.trim() || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('❌ 注册活动错误:', err);

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
            data: {
                registrationId: result.insertId
            }
        });
    });
});

// 获取所有类别
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT category_id, category_name FROM event_categories ORDER BY category_name';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ 获取类别错误:', err);
            return res.status(500).json({
                success: false,
                error: 'Failed to fetch categories'
            });
        }
        
        res.json({
            success: true,
            data: results
        });
    });
});

// 简化的 404 处理 - 放在所有路由的最后
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `The route ${req.method} ${req.originalUrl} does not exist`,
        availableEndpoints: [
            'GET /health',
            'GET /api/events',
            'GET /api/events/:id',
            'POST /api/events',
            'PUT /api/events/:id',
            'DELETE /api/events/:id',
            'POST /api/registrations',
            'GET /api/categories'
        ]
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`🚀 Charity Events API server running on port ${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
    console.log(`📝 API Base URL: http://localhost:${port}/api`);
    console.log('✅ Server started successfully!');
});