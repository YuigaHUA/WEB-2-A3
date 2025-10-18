-- 清空数据库并重新创建
DROP DATABASE IF EXISTS charity_events;
CREATE DATABASE charity_events;
USE charity_events;

-- 创建活动类别表
CREATE TABLE event_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建活动表
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

-- 创建注册表
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
    UNIQUE KEY unique_event_email (event_id, user_email)
);

-- 插入类别数据
INSERT INTO event_categories (category_name) VALUES 
('Environmental Protection'),      -- category_id: 1
('Education Support'),             -- category_id: 2
('Medical Assistance'),            -- category_id: 3
('Community Service'),             -- category_id: 4
('Disaster Relief'),               -- category_id: 5
('Animal Welfare');                -- category_id: 6

-- 插入活动数据（使用正确的category_id）
INSERT INTO events (title, description, event_date, location, price, category_id) VALUES
('Beach Cleanup Day', 'Join us for a community beach cleanup to protect marine life and keep our oceans clean. We will provide all necessary equipment.', '2025-12-15 09:00:00', 'Sunshine Beach', 0.00, 1),
('Mountain Teaching Volunteer', 'Volunteer to teach children in remote mountain areas. Help provide educational support and make a difference in their lives.', '2025-12-20 08:00:00', 'Hope Primary School', 50.00, 2),
('Charity Medical Camp', 'Free medical checkups and consultations for community members. Professional doctors and medical staff will be available.', '2025-12-25 10:00:00', 'Community Health Center', 0.00, 3),
('Food Drive for Homeless', 'Collect and distribute food to homeless people in our city. Your contribution can help feed those in need.', '2025-12-18 14:00:00', 'City Central Park', 0.00, 4),
('Animal Shelter Support', 'Help care for abandoned animals at the local shelter. Activities include feeding, cleaning, and playing with animals.', '2025-10-16 11:00:00', 'Paws Animal Shelter', 25.00, 6),
('Spring Tree Planting', 'Help us plant trees in urban areas to improve air quality and create green spaces.', '2025-05-01 08:00:00', 'City Green Belt', 0.00, 1),
('Summer Reading Program', 'Volunteer to read with children and promote literacy in our community.', '2025-06-15 13:00:00', 'Public Library', 0.00, 2),
('Community Health Fair', 'Health education and free screenings for the whole family.', '2025-07-20 09:00:00', 'Community Center', 0.00, 3);

-- 插入注册数据
INSERT INTO registrations (event_id, user_name, user_email, user_phone, ticket_quantity, special_requirements) VALUES
(1, 'John Smith', 'john.smith@email.com', '+1234567890', 2, 'Bringing my own gloves'),
(1, 'Sarah Johnson', 'sarah.j@email.com', '+1234567891', 1, 'Vegetarian lunch option'),
(2, 'Mike Chen', 'mike.chen@email.com', '+1234567892', 3, 'Can teach mathematics'),
(2, 'Emily Davis', 'emily.davis@email.com', '+1234567893', 2, 'First time volunteer'),
(3, 'Dr. Robert Brown', 'robert.brown@email.com', '+1234567894', 1, 'Medical professional'),
(3, 'Lisa Wang', 'lisa.wang@email.com', '+1234567895', 2, 'Interested in pediatric care'),
(4, 'David Wilson', 'david.wilson@email.com', '+1234567896', 4, 'Can help with transportation'),
(5, 'Anna Martinez', 'anna.m@email.com', '+1234567897', 2, 'Allergic to cats'),
(5, 'James Taylor', 'james.t@email.com', '+1234567898', 1, 'Experience with dogs');