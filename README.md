## BlueShelves. 
<img width="192" height="192" alt="image" src="https://github.com/user-attachments/assets/1bf28f70-629f-4b8c-8a45-5623324fea65" />

## Overview

This project is a monorepo that integrates three core components working together to simulate an RFID-enabled inventory management workflow. Due to restricted access to real RFID hardware for some team members, RFID functionalities are simulated within the system.

The system consists of:

* **Database/API** (PostgreSQL + NeonDB + Express/Node.js)
* **Mobile App** (React Native + Expo)
* **Web Dashboard** (Next.js deployed on Vercel)

Together, these components support full CRUD operations across items, tags, and tracking records in a cross-platform setting.

---

## Project Description

### **Purpose**

BlueShelves will help its users to keep accurate inventory numbers. It will provide actionable data to make better decisions, and it will ease the mind of warehouse managers by taking a big load off their shoulders.BlueShelves is a simple, reliable, and effective system that will take care of your inventory for you. For now the project aims to be a small-scale or educationally oriented project to showcase IoT concepts.


### **Objectives**

* Build a cross-functional system that handles item, tag, and tracking data.
* Implement simulated RFID operations that align with real-world workflows.
* Provide an interface for mobile usage and web dashboard management.
* Demonstrate CRUD operations across all components.
* Maintain a clean, scalable monorepo structure.

### **Requirements**

1. Mobile App - Scanning. (Core)
2. Mobile App - Syncing. (Core)
3. Web Dashboard - Displaying. (Core)
4. Database - API management. (Core)
5. Authentication. (Enhancement)
6. CSV Generation. (Enhancement)

**See submission document for further details.

---

## Project Structure

The project follows a **monorepo structure** with three main folders:

```
root/
│
├── database/                 # Express.js API + PostgreSQL (NeonDB)
├── mobileapp/              # React Native + Expo mobile client
└── dashboard/          # Next.js web admin dashboard

```

### **1. Database & API (Express + Node.js + PostgreSQL)**

* Built with Express.js
* Connected to PostgreSQL database hosted on **NeonDB**
* Provides RESTful routes for:

  * Items
  * Item_tracking (Tags)
  * Users
  
* Manages Items details through CRUD operations.
* Simulates RFID reads via API endpoints
* Secured by CORS and API-Key requirements.

### **2. Mobile App (React Native + Expo)**

* Built with Expo for cross-platform iOS/Android compatibility.
* Performs CRUD operations for item management and tag tracking.
* Simulates RFID tag scanning and status update.
* Authentication mocks simple username + password logic (originally using Google OAuth but simplified for grading purposes.
* Login password: **`letmein123`** (any username).

### **3. Web Dashboard (Next.js + Vercel)**

* Built using Next.js.
* Provides an administrative dashboard to manage items.
* Includes CRUD functionality mirroring the mobile app for items.
* Provides an access to the tag generator which assigns a unique ID to each tracking. Since this page '/print' is role protected, to access the tag generator use **`username: test4@mail.com`** and **`password: password1`** since that user has admin permissions. for general access simply register and login with a new username and password. 
* Hosted on **Vercel**

---

## Features

### **System‑wide Features**

* Unified API for mobile app and web dashboard client requests.
* Simulated RFID scanning workflow. 
* CRUD operations across items and tracking records

### **Mobile App Features**

* Login screen (simple auth)
* View, create, update, and delete items
* View and simulate scanning tags
* Update tracking status

### **Web Dashboard Features**

* Items CRUD operations
* Visual overview of items.
* Interface for generating tag IDs.

### **API Features**

* RESTful endpoints for all relevant models.
* Database normalization and relation handling.
* Security features such as CORS and API-Key requirement.
* RFID simulation endpoints

---

## Tools & Technologies

### **Database/API**

* **PostgreSQL**
* **NeonDB** (cloud PostgreSQL)
* **Express.js** + **Node.js**

### **Mobile App**

* **React Native**
* **Expo**
* **Expo Router**

### **Web Dashboard**

* **Next.js**
* **Vercel** deployment

### **Development**

* Monorepo setup
* JavaScript/TypeScript
* Shared utilities and interfaces

---

## User Guide / How to Evaluate the Project

* See .env.example on each specific sub-folder to add the right environmental variables for testing.

### **1. Mobile App (Expo)**

* Install dependencies: `npm install`
* Use Expo Go for testing: 'npm run start' --> 's' for expo Go OR 'npx expo start --go'
* **Login credentials:**

  * Username: *any value*
  * Password: **`letmein123`**
* Once logged in, you may:

  * View, create, edit, and delete items via the dashboard tab
  * Simulate tag scan sessions via the scan tab.
  * Update relevant information on the trackings by finishing a scan session and clicking 'Mark as...' buttons. (Once you start a new scan session you might simulate finding the same tag and see that the status has changed). If tested locally, you may send a request to the API with GET http://localhost:3000/trackings and see how the tracking_status has changed for the updated tags. 

### **2. Web Dashboard (Next.js)**

* Start development server: `npm run start`
* Login credentials will be provided soon
* From there you can:

  * View and manage all items
  * Generate tags with unique random ids via the /print tab (Access through the nav bar). If tested locally, you may send a request to the API with GET http://localhost:3000/trackings and see how the new trackings have been added.   
  * Perform CRUD operations identical to the mobile app on the items.

### **3. API (Express.js)**

* Start server: `npm run database:start` (or project-specific command)
* API routes include endpoints for:

  * `/items`
  * `/trackings`
  * `/users`
 
* The API can be tested using tools like Postman or cURL

---

## Notes

* RFID operations throughout the project are **simulated** due to limited access to RFID hardware.
* The system is designed to scale in the future to accommodate real hardware integrations.

---

## Future Improvements

* Real RFID integration
* Extend Role‑based user authentication
* Extended analytics on tracking events
* Correlation between tracking count and items quantity count. 

---

Thank you for reviewing this project!


# Development Environment

This project is built using:

- **React** – for the responsive web interface  
- **React Native** – for the cross-platform mobile app  
- **PostgreSQL** – as the main database for storing data
- **VS Code** – as the primary development environment
- **Vercel** – for deployment and hosting
- **Expo** – for mobile deployment and hosting

# Useful Websites

* [Vercel Docs](https://vercel.com/docs/deployments)
* [React Docs](https://react.dev/)
* [React Native Docs](https://reactnative.dev/docs/getting-started)
* [PostgreSQL Docs](https://www.postgresql.org/docs/)
* [Web dashboard PROD](https://blue-shelves-iot-web-dashboard.vercel.app/)
* [OnRender API PROD deployment](https://blueshelves-iot.onrender.com/)

# Collaborators

- Abraham Galicia (Project Lead)  
- Thandokuhle Simelane
- Julio Reyes
- Ezenwoke Uchechukwu Promise

# Quotes

- Abraham Galicia: "Our cause is never more in danger than when a human, no longer desiring, but still intending, to do our Enemy's will, looks round upon a universe from which every trace of Him seems to have vanished, and asks why he has been forsaken, and still obeys." -C.S Lewis, The Screwtape Letters. 

- Thandokuhle Simelane: “Give me a place to stand, and I will move the Earth.” by Archimedes.

- Julio Reyes: "We do not think ourselves into new ways of living, we live ourselves into new ways of thinking." by Richard Rohr.
