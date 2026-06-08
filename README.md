# 🏦 Bank Ledger Backend

A secure and scalable banking ledger backend built with **Node.js**, **Express.js**, and **MongoDB**, implementing **Double-Entry Accounting**, **JWT Authentication**, **MongoDB Transactions**, **Idempotency Keys**, and **Email Notifications**.

🔗 **Live API:** https://bank-ledger-backend-p2g0.onrender.com

---

## 📌 Overview

Bank Ledger Backend is a financial transaction management system that allows users to create accounts, transfer funds, track balances through ledger entries, and maintain transaction integrity using MongoDB sessions and transactions.

Instead of storing balances directly, the application calculates balances dynamically from immutable ledger records, similar to how real banking systems operate.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* System User Authorization
* Token Blacklisting (Logout Support)

### 👤 Account Management

* Create Bank Account
* Account Status Management

  * ACTIVE
  * FROZEN
  * CLOSED
* Retrieve Account Balance

### 💸 Transaction System

* Initial Funds Allocation
* User-to-User Transfers
* Transaction Validation
* Insufficient Balance Checks
* Transaction Status Tracking

  * PENDING
  * COMPLETED
  * FAILED
  * REVERSED

### 📒 Double-Entry Ledger

* Debit Entries
* Credit Entries
* Immutable Ledger Records
* Dynamic Balance Calculation
* Financial Audit Trail

### ⚡ Reliability Features

* MongoDB Transactions & Sessions
* Idempotency Key Support
* Atomic Money Transfers
* Rollback on Failure

### 📧 Email Notifications

* Welcome Email on Registration
* Transaction Success Notifications
* Transaction Failure Notifications

### ☁️ Deployment

* MongoDB Atlas
* Render Deployment
* Environment-Based Configuration

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (jsonwebtoken)
* bcrypt

### Email Service

* Nodemailer

### Security

* Cookie Parser
* Token Blacklisting

### Deployment

* Render
* MongoDB Atlas

---

## 📂 Project Structure

```text
Bank-Ledger-Backend
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── account.controller.js
│   │   ├── auth.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware
│   │   └── auth.middleware.js
│   │
│   ├── models
│   │   ├── account.model.js
│   │   ├── blacklist.model.js
│   │   ├── ledger.model.js
│   │   ├── transaction.model.js
│   │   └── user.model.js
│   │
│   ├── routes
│   │   ├── account.routes.js
│   │   ├── auth.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── services
│   │   └── email.service.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 🗄️ Database Models

### User

* name
* email
* password
* systemUser

### Account

* user
* status
* currency

### Transaction

* fromAccount
* toAccount
* amount
* idempotencyKey
* status

### Ledger

* account
* amount
* transaction
* type

### Blacklist

* token
* blacklistedAt

---

## 🔄 Transaction Flow

### Money Transfer Process

1. Validate Request
2. Validate Idempotency Key
3. Verify Accounts
4. Check Account Status
5. Calculate Sender Balance
6. Create Transaction (PENDING)
7. Create Debit Ledger Entry
8. Create Credit Ledger Entry
9. Mark Transaction as COMPLETED
10. Commit MongoDB Transaction
11. Send Email Notification

---

## 📒 Double Entry Accounting

Every transfer creates two ledger entries:

### Example

Transfer ₹2000 from Account A to Account B

```text
Account A → DEBIT ₹2000
Account B → CREDIT ₹2000
```

### Balance Formula

```text
Balance = Total Credits - Total Debits
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Bank-Ledger-Backend.git
```

### Move to Project Folder

```bash
cd Bank-Ledger-Backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create `.env` file and add required variables.

### Start Server

```bash
npm start
```

or

```bash
npm run dev
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |
| POST   | /api/auth/logout   | Logout User   |

---

### Accounts

| Method | Endpoint                        | Description    |
| ------ | ------------------------------- | -------------- |
| POST   | /api/account/create             | Create Account |
| GET    | /api/account/:accountId/balance | Get Balance    |

---

### Transactions

| Method | Endpoint                               | Description       |
| ------ | -------------------------------------- | ----------------- |
| POST   | /api/transactions/system/initial-funds | Add Initial Funds |
| POST   | /api/transactions/transfer             | Transfer Money    |

---

## 🧪 Sample Transfer Request

```json
{
  "fromAccount": "ACCOUNT_ID_1",
  "toAccount": "ACCOUNT_ID_2",
  "amount": 2000,
  "idempotencyKey": "transfer-001"
}
```

---

## 📈 Future Improvements

* Refresh Tokens
* Account Statements
* Transaction History API
* Scheduled Transfers
* Admin Dashboard
* Rate Limiting
* Two Factor Authentication (2FA)
* Swagger API Documentation
* Docker Support
* CI/CD Pipeline

---

## 👨‍💻 Author

**Dhruv Talati**

B.Tech Information Technology Student

Passionate about Backend Development, System Design, Databases, and Scalable Web Applications.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
