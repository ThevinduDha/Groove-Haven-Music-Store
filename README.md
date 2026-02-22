<div align="center">
  
# 🎵 GrooveHaven

### *Where Music Meets Connection*

[![Java](https://img.shields.io/badge/Java-17%2B-orange?logo=java)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ Overview

**GrooveHaven** is a full-stack music streaming platform built with modern web technologies. It's not just another music player - it's a social ecosystem where artists and listeners connect through the power of music. With a stunning glassmorphism UI and role-based access, GrooveHaven delivers a premium music experience right in your browser.

---

## 🎨 Features Showcase

### 🎧 For Listeners

| Feature | Description |
|---------|-------------|
| **Seamless Streaming** | Custom glassmorphism audio player with play, pause, seek, and volume controls |
| **Responsive Design** | Perfect experience on desktop and mobile with collapsible sidebar |
| **Smart Discovery** | Powerful search engine for songs and artists |
| **Social Integration** | Like songs and follow favorite artists |
| **Community Hub** | Real-time comments with edit/delete capabilities |
| **Personal Library** | Create and manage custom playlists |
| **Instant Notifications** | Beautiful toast popups for all actions |

### 🎤 For Artists

| Feature | Description |
|---------|-------------|
| **Command Center** | Real-time analytics dashboard with follower and stream counts |
| **Album Management** | Create albums with cover art and descriptions |
| **Music Upload** | Easy MP3 upload with album linking |
| **Profile Customization** | Personalize bio and display name |
| **Fan Engagement** | View and interact with comments directly |

### 👑 For Admins

| Feature | Description |
|---------|-------------|
| **User Management** | Complete overview of users and roles |
| **Content Moderation** | Ban/delete users and remove inappropriate content |

---


---

## 💻 Tech Stack

### Frontend
- ⚛️ **React.js 18** with Vite for blazing-fast development
- 🎨 **Custom CSS3** with glassmorphism effects
- 📱 **Responsive Design** using Flexbox & Grid
- 🔔 **React Hot Toast** for professional notifications
- 🌐 **Fetch API** for backend communication

### Backend
- ☕ **Java Spring Boot** for robust RESTful APIs
- 📊 **Spring Data JPA** for seamless database interaction
- 🗃️ **Hibernate** for efficient entity management
- 📦 **Maven** for dependency management

### Database
- 🐬 **MySQL** for relational data
- 📁 **Local File System** for media storage

---

## 🚀 Quick Start

### Prerequisites
- Java JDK 17+
- Node.js & npm
- MySQL Server 8.0+

### ⚡ Installation

---
#### 1️⃣ Database Setup
```sql
CREATE DATABASE groovehaven_db;
```

---
###2️⃣ Backend Configuration

Navigate to the backend folder and update src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/groovehaven_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

# File Upload Path (Must end with a slash /)
upload.path=C:/Users/YourName/Desktop/GrooveHaven_Music/

Run the backend:
---
bash
mvn spring-boot:run
3️⃣ Frontend Setup
Navigate to the frontend folder:

bash
npm install
npm run dev
Visit http://localhost:5173

---
📝 License
---
This project is licensed under the MIT License - see the LICENSE file for details.

---
👨‍💻 Author
---

<div align="center">
Thevindu Dharmadasa
Full-Stack Developer


Built with ❤️ using Java and React

</div> ```
