# 🏦 Bank Ledger System

A production-inspired full-stack banking application built with **React, Node.js, Express.js, and MongoDB**, implementing real-world financial principles such as **Double-Entry Accounting**, **Atomic Transactions**, **Immutable Ledger Records**, **JWT Authentication**, and **Financial Analytics**.

---

# 🌟 Live Demo

### Frontend

https://bank-ledger-backend.vercel.app/

### Backend API

https://bank-ledger-backend-p2g0.onrender.com

---
---

# 📸 Screenshots

## Login Page

<img width="693" height="747" alt="image" src="https://github.com/user-attachments/assets/71d45464-456c-4e9c-a6c1-b0152bed31de" />


---

## Dashboard

<img width="1339" height="862" alt="image" src="https://github.com/user-attachments/assets/3b4f0d56-366b-445d-b67e-36cbec4027b9" />


---

## Transaction History

<img width="1562" height="802" alt="image" src="https://github.com/user-attachments/assets/6badb545-a7eb-419f-b175-b2ea70a8ca2f" />


---

## Analytics Dashboard

<img width="1336" height="785" alt="image" src="https://github.com/user-attachments/assets/37f9968f-b053-4018-9cf0-daef622c04cc" />


---

# ⚙️ Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

FRONTEND_URL=http://localhost:5173
```

---

# 🚀 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/bank-ledger-system.git

cd bank-ledger-system
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📡 API Documentation

## Authentication

### Register User

```http
POST /api/auth/register
```

Request Body

```json
{
  "name": "Dhruv",
  "email": "dhruv@example.com",
  "password": "password123"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body

```json
{
  "email": "dhruv@example.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "jwt_token_here"
}
```

---

# 👤 Account APIs

### Create Account

```http
POST /api/accounts
```

Headers

```text
Authorization: Bearer JWT_TOKEN
```

---

### Get Account Details

```http
GET /api/accounts/me
```

---

# 💸 Transaction APIs

### Transfer Funds

```http
POST /api/transactions/transfer
```

Headers

```text
Authorization: Bearer JWT_TOKEN
```

Request

```json
{
  "receiverAccountId": "ACCOUNT_ID",
  "amount": 2000,
  "idempotencyKey": "txn-12345"
}
```

Response

```json
{
  "success": true,
  "message": "Transfer completed"
}
```

---

### Transaction History

```http
GET /api/transactions
```

---

# 📊 Analytics APIs

### Account Analytics

```http
GET /api/analytics
```

Response

```json
{
  "totalCredits": 15000,
  "totalDebits": 7000,
  "netFlow": 8000
}
```


# 🧪 Postman Collection

Import the Postman collection from:

```text
docs/Bank-Ledger-System.postman_collection.json
```

The collection includes:

* Authentication APIs
* Account APIs
* Transaction APIs
* Analytics APIs
* Sample Requests
* Environment Variables

---

# 📖 About The Project

Bank Ledger System is a modern digital banking application designed using industry-standard accounting principles.

Unlike traditional banking systems that directly store account balances, this application follows an **immutable ledger architecture** where balances are calculated dynamically from transaction records.

Every transfer generates corresponding debit and credit ledger entries, ensuring:

* Financial consistency
* Auditability
* Data integrity
* Transaction traceability

This architecture closely resembles the approach used by real-world financial systems and payment platforms.

---

# 🚀 Key Features

## 🔐 Authentication & Security

* User Registration & Login
* JWT-Based Authentication
* Protected API Routes
* Secure Password Hashing using bcrypt
* Token Blacklisting on Logout
* Role-Based System User Authorization

---

## 👤 Account Management

* Create Bank Accounts
* Dynamic Balance Calculation
* Multi-State Account Lifecycle

### Supported Account States

* ACTIVE
* FROZEN
* CLOSED

---

## 💸 Transaction Engine

* Initial Funds Allocation
* User-to-User Money Transfers
* Account Status Validation
* Balance Verification
* Transaction Status Tracking
* Idempotency Key Protection
* Duplicate Transaction Prevention

---

## 📒 Double-Entry Accounting System

Every transaction creates:

* Debit Entry (Sender)
* Credit Entry (Receiver)

This ensures:

* Accounting Accuracy
* Complete Audit Trail
* Immutable Financial Records

### Example

Transfer ₹2,000 from Account A → Account B

Debit Account A → ₹2,000

Credit Account B → ₹2,000

---

## ⚡ Reliability & Consistency

### MongoDB Transactions

The system uses MongoDB Sessions and Transactions to ensure:

* Atomic Transfers
* Consistent Data
* Automatic Rollbacks
* Failure Recovery

If any step fails during a transfer, the entire operation is reverted automatically.

---

## 📊 Analytics Dashboard

Financial insights generated directly from ledger records.

### Analytics Include

* Total Credits
* Total Debits
* Net Cash Flow
* Transaction Trends
* Credit vs Debit Distribution
* Historical Transaction Analysis

---

## 📜 Transaction History

* Complete Transaction Timeline
* Search Transactions
* Filter Transactions
* Recent Activity Widget
* Transaction Status Tracking

---

## 📧 Email Notification System

Automated notifications using Nodemailer.

### Supported Emails

* Welcome Email
* Successful Transfer Notification
* Failed Transfer Alert

---

## 🎨 Modern User Experience

* Fully Responsive Design
* Dark Mode Support
* Framer Motion Animations
* React Hot Toast Notifications
* Interactive Charts
* Loading Skeletons
* Clean Banking Dashboard

---

# 🏗️ System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Express REST API
 │
 ▼
Authentication Layer
 │
 ▼
Business Logic Layer
 │
 ▼
MongoDB Transactions
 │
 ▼
Ledger Records
 │
 ▼
Dynamic Balance Calculation
```

---

# 📐 Balance Calculation Formula

Balance is never stored directly.

Instead:

Balance = Total Credits − Total Debits

This prevents balance inconsistencies and ensures ledger integrity.

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS v4
* React Router DOM
* Axios
* React Hook Form
* Framer Motion
* React Hot Toast
* Recharts

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication

* JWT
* bcrypt

---

## Email Service

* Nodemailer

---

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

# 📂 Project Structure

## Frontend

```text
src
│
├── components
│   ├── Navbar.jsx
│   ├── BalanceCard.jsx
│   ├── StatusCard.jsx
│   ├── AccountInfoCard.jsx
│   ├── QuickActions.jsx
│   ├── RecentTransactions.jsx
│   └── TransactionTrendChart.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Transfer.jsx
│   ├── Transactions.jsx
│   └── Analytics.jsx
│
├── context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
└── services
```

---

## Backend

```text
src
│
├── controllers
├── middleware
├── models
├── routes
├── services
├── utils
└── app.js
```

---

# 🗄️ Database Schema

## User

```javascript
{
  name,
  email,
  password,
  systemUser
}
```

## Account

```javascript
{
  user,
  status,
  currency
}
```

## Transaction

```javascript
{
  fromAccount,
  toAccount,
  amount,
  idempotencyKey,
  status
}
```

## Ledger

```javascript
{
  account,
  amount,
  transaction,
  type
}
```

## Blacklist

```javascript
{
  token,
  blacklistedAt
}
```

---

# 🔄 Money Transfer Workflow

1. Validate Request
2. Verify JWT Token
3. Verify Sender & Receiver Accounts
4. Check Account Status
5. Calculate Sender Balance
6. Create Transaction (PENDING)
7. Create Debit Ledger Entry
8. Create Credit Ledger Entry
9. Mark Transaction COMPLETED
10. Commit MongoDB Transaction
11. Send Email Notification

---

# 🧪 Security Measures

✅ JWT Authentication

✅ Password Hashing (bcrypt)

✅ Protected Routes

✅ Token Blacklisting

✅ Account Status Validation

✅ Duplicate Transaction Prevention

✅ Atomic Database Transactions

✅ Immutable Ledger Records

---

# 📈 Scalability Considerations

The architecture is designed to support future enhancements such as:

* Refresh Tokens
* Multi-Currency Support
* Scheduled Transfers
* Beneficiary Management
* Admin Dashboard
* Two-Factor Authentication (2FA)
* Docker Containerization
* CI/CD Pipelines
* API Documentation (Swagger/OpenAPI)
* Microservice Migration

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

* REST API Design
* Authentication & Authorization
* MongoDB Transactions
* Financial Ledger Systems
* Double-Entry Accounting
* Backend Architecture
* React Frontend Development
* Secure Application Design
* Data Consistency Patterns
* Production-Oriented Development

---

# 👨‍💻 Author

## Dhruv Talati

B.Tech Information Technology (2027)

Passionate about:

* Backend Development
* System Design
* Databases
* Financial Systems
* Full Stack Development
* Scalable Applications

---

## 📄 License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

# ⭐ Support

If you found this project useful, please consider giving it a star on GitHub.

Contributions, suggestions, and feedback are always welcome.

