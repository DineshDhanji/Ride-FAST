# Ride-FAST - Fast & Reliable Ride-Sharing Platform

<!-- ![Ride-FAST Demo](./assets/images/adaptive-icon.png)   -->
<div style="position: relative">
  <!-- Cover Image -->
  <img src="./assets/images/background.jpg" width="100%" height="200rem" style="object-fit: cover" alt="Cover Image">
  
  <!-- Main Image (Icon) -->
  <img src="./assets/images/icon - transparent background.png" width="200" height="200" style="background-color: transparent; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); object-fit: contain" alt="Main Icon">
</div>

## Table of Contents
- [Ride-FAST - Fast \& Reliable Ride-Sharing Platform](#ride-fast---fast--reliable-ride-sharing-platform)
  - [Table of Contents](#table-of-contents)
  - [Introduction 🚖](#introduction-)
  - [UI 🌠](#ui-)
  - [Features ✨](#features-)
  - [Technologies Used 💻](#technologies-used-)
  - [Configuration 🔧](#configuration-)
  - [Contributing 🤝](#contributing-)

## Introduction 🚖
Ride-FAST is a modern ride-sharing platform designed to connect passengers with drivers swiftly and efficiently. Built with performance and user experience in mind, this full-stack application provides seamless ride booking, real-time tracking, and secure payment processing.

## UI 🌠
<image src="./ui/Login Page.jpg" alt="Login page">
<image src="./ui/Signup Page.jpg" alt="sign up page">
<image src="./ui/Home Page.jpg" alt="Home page">
<image src="./ui/Create Ride Page.jpg" alt="Create ride page">
<image src="./ui/Search Page.jpg" alt="Search page">
<image src="./ui/Notifications Page.jpg" alt="Notifications page">
<image src="./ui/Setting Page.jpg" alt="Setting page">
<image src="./ui/Appearance Page.jpg" alt="Appearance page">
<image src="./ui/About Page.jpg" alt="About page">
<image src="./ui/FAQ Page.jpg" alt="FAQ page">

## Features ✨
- **User Authentication**: Secure JWT-based login/signup system
- **Ride Management**:  
  ✓ Request rides with pickup/drop locations  
  ✓ Real-time ride status tracking  
  ✓ Ride history with details
- **Driver Matching**: Intelligent algorithm to connect riders with nearest drivers
- **Interactive UI**: Responsive dashboard for both riders and drivers
- **Rating System**: Post-ride rating and feedback system
- **Admin Panel**: Manage users, rides, and platform settings

## Technologies Used 💻
**Frontend**:  
- React.js  
- Redux (State Management)  
- Axios (HTTP Client)  
- Map Integration (Google Maps/Mapbox)  

**Backend**:  
- Django   
- SQLite (Database)  
- JSON Web Tokens (Authentication)  

**DevOps**:  
- Docker (Containerization)  

## Configuration 🔧
Create `.env` file in backend directory:
```env
EXPO_PUBLIC_BASE_API_URL=your_backend
EXPO_PUBLIC_GOOGLE_MAP_API_KEY=your_google_map_api_key 
```

## Contributing 🤝
Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request