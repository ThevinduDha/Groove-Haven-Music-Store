# 🎵 GrooveHaven - Full-Stack Music Streaming Platform

**GrooveHaven** is a modern, responsive music streaming application built from scratch. It features role-based access (Artists, Listeners, Admins), a structured music library with Albums, a social ecosystem, and a robust playlist management system.


---

## 🚀 Features

### 🎧 For Listeners
* **Music Streaming:** Seamless audio playback with a custom glassmorphism player (Play, Pause, Seek, Volume).
* **Responsive UI:** Fully functional on Desktop and Mobile (Collapsible Sidebar & Hamburger Menu).
* **Discovery:** Search engine for Songs and Artists.
* **Social:** "Like" songs and "Follow" favorite artists.
* **Community:** Real-time comments on tracks with Edit/Delete capabilities.
* **Playlists:** Create custom playlists and manage your personal library.
* **Smart Notifications:** Beautiful toast popups for actions (e.g., "Added to Playlist").

### 🎙️ For Artists
* **Artist Command Center:** Dashboard with real-time analytics (Follower count, Stream count).
* **Album Management:** Create Albums with cover art and descriptions.
* **Music Upload:** Upload MP3s and link them directly to specific Albums.
* **Profile:** Customize bio and display name.
* **Engagement:** View and interact with fan comments directly from the dashboard.

### 🛡️ For Admins
* **User Management:** View all users and roles.
* **Moderation:** Ban/Delete users and remove inappropriate content.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js (Vite):** Fast, component-based UI.
* **CSS3:** Custom glassmorphism styling, responsive Flexbox/Grid layouts.
* **React Hot Toast:** Professional notification system.
* **Fetch API:** For backend communication.

### **Backend**
* **Java Spring Boot:** RESTful API architecture.
* **Spring Data JPA:** Database interaction and ORM.
* **Hibernate:** Entity management.
* **Maven:** Dependency management.

### **Database**
* **MySQL:** Relational database for Users, Songs, Albums, Playlists, Comments, and Follows.
* **Local Storage:** File system storage for MP3s and Images.

---


---

## ⚙️ Installation & Setup

Follow these steps to run GrooveHaven locally.

### 1. Prerequisites
* **Java JDK 17+**
* **Node.js & npm**
* **MySQL Server**

### 2. Database Setup
Open MySQL Workbench (or terminal) and create the database:
```sql
CREATE DATABASE groovehaven_db;



3. Backend Setup
Navigate to the backend folder.

Open src/main/resources/application.properties.

Configure your database credentials and upload path:

spring.datasource.url=jdbc:mysql://localhost:3306/groovehaven_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

# File Upload Path (Must end with a slash /)
upload.path=C:/Users/YourName/Desktop/GrooveHaven_Music/
Run the application:

Bash

mvn spring-boot:run
4. Frontend Setup
Navigate to the frontend folder.

Install dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
Open http://localhost:5173 in your browser.

🔗 API Endpoints Overview
Method	Endpoint	Description
POST	/auth/login	User authentication
POST	/albums/create	Create a new album (Artist only)
POST	/songs/upload	Upload MP3 & Cover linked to Album
GET	/songs	Fetch all songs
POST	/playlists/create	Create a new playlist
POST	/comments/add	Post a comment on a song
POST	/follow/toggle	Follow/Unfollow an artist
DELETE	/users/{id}	Delete a user (Admin only)

🔮 Future Improvements
[ ] JWT Security: Implement secure token-based authentication (Persistent Login).

[ ] Cloud Storage: Integrate AWS S3 or Cloudinary for file hosting.

[ ] Music Queue: Add "Play Next" functionality.

[ ] Recommendations: AI-based song suggestions.

👨‍💻 Author
Thevindu Dharmadasa Full-Stack Developer

Built with ❤️ and Java.
