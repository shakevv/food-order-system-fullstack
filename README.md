# Food Order System

### Introduction
The Online Food Order System provides ability for restaurants to sell food online, and for clients to order food directly to their home with a few clicks. The system is developed as a Single Page Application as frontend and the backend is implemented as a RESTful web service.

### Technology Stack
- Typescript
- MongoDB
- Express
- Angular
- Node.js

### Main Use Cases
There are two types of users - Anonymous (Unauthenticated) and Moderators (Authenticated). Based on the type there are certain functionalities. By default there is one moderator in the system.

**Unauthenticated User can:**
- Browse the Home page, Products and About section;
- Add Products to the Cart and see Cart details;
- Create orders and see Order details;
- Login in the system using email and password.

**Authenticated User can:**
- View and manage Categories, Products, Orders and other Users;
- Update his/her password;
- Register new Users;
- Logout.

### Main views
- Home (contains Menu and About sections);
- Cart Details;
- Preview & Create Order;
- Login;
- Manage Orders;
- Manage Users.