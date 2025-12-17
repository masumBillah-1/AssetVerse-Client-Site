<h1 align="center">
  <img src="./public/assetverse-favicon.svg" alt="AssetVerse Logo" width="48" style="vertical-align: middle;" />
  <span style="margin-left: 10px;">AssetVerse</span>
</h1>



---

## 📌 Project Purpose

AssetVerse is a comprehensive full-stack B2B Corporate Asset Management System designed to help organizations efficiently manage company assets and employee allocations. It enables HR managers to track assets, approve employee requests, enforce package limits, and maintain accountability, while employees can request and manage assets across multiple companies.

---

## 🔗 Live Site

👉 **[https://boisterous-blancmange-4da68a.netlify.app](https://boisterous-blancmange-4da68a.netlify.app)**

---

## 👤 Test Credentials

### HR Manager Account
- **Email:** `mb6517640@gmail.com`  
- **Password:** `V5DAaj58xzfTmju`

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- ✅ Email & Password authentication using Firebase
- ✅ JWT-based secure API access
- ✅ Role-based access control (HR & Employee)
- ✅ Private and protected routes

### 🧑‍💼 HR Manager Features
- ✅ Company registration with default subscription (5 employees)
- ✅ Add, edit, delete company assets
- ✅ View and manage asset requests
- ✅ Approve / reject employee requests
- ✅ Auto-affiliation on first approved request
- ✅ Track current employees vs package limit
- ✅ Upgrade package using Stripe payment
- ✅ View analytics with charts (Recharts)

### 👨‍💻 Employee Features
- ✅ Register independently without company
- ✅ Request assets from multiple companies
- ✅ View assigned assets from all companies
- ✅ Return returnable assets (optional)
- ✅ View team members by company
- ✅ Manage personal profile

### 📦 Asset Management
- ✅ Returnable & Non-returnable asset support
- ✅ Inventory tracking with available quantity
- ✅ Asset assignment & return tracking

---

## 🖥️ Dashboard Pages

### HR Dashboard
- 📊 **Asset List** (Main Dashboard)
- ➕ **Add Asset**
- 📋 **All Requests**
- 👥 **My Employee List**
- 🚀 **Upgrade Package**
- 👤 **Profile**

### Employee Dashboard
- 📦 **My Assets**
- 🙋 **Request an Asset**
- 👥 **My Team**
- 👤 **Profile**

---

## 🛠️ Technologies Used

### Client Side
- ⚛️ React
- 🔀 React Router
- 🔥 Firebase Authentication
- 📡 Axios
- 🎨 Tailwind CSS
- 🌼 DaisyUI
- 🎬 Framer Motion
- 📊 Recharts

### Server Side
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 🔐 JWT (JSON Web Token)
- 💳 Stripe
- 🔒 dotenv
- 🌐 cors

---

## 🔒 Security Implementation

- 🔑 JWT token generation on login
- 🛡️ `verifyToken` middleware for protected routes
- 👔 `verifyHR` middleware for admin-only routes
- 🔐 Secure environment variable usage
- 🚫 Input validation and sanitization

---

## 📊 Analytics

- 📈 **Pie Chart:** Returnable vs Non-returnable assets
- 📊 **Bar Chart:** Top requested assets
- 🔄 Real-time data from backend APIs
- 📱 Responsive charts using Recharts

---

## 📁 Database Collections

```
├── users
├── assets
├── requests
├── assignedAssets
├── employeeAffiliations
├── packages
└── payments
```

---

## ⚙️ Environment Variables

### Client (.env)
```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Server (.env)
```env
DB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

> ⚠️ **Important:** Never push `.env` files to GitHub. Add them to `.gitignore`.

---

## ▶️ How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Client Setup

```bash
# Navigate to client directory
cd assetverse-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The client will run on `https://github.com/masumBillah-1/AssetVerse-Client-Site` (or your configured port)

### Server Setup

```bash
# Navigate to server directory
cd assetverse-server

# Install dependencies
npm install

# Start server with nodemon
nodemon index.js
```

The server will run on `https://github.com/masumBillah-1/AssetVerse-Server-Site` (or your configured port)

---

## 💳 Payment Integration

- 💰 Stripe payment gateway
- 🛒 Secure checkout for package upgrades
- ⚡ Instant package limit update on successful payment
- 📜 Payment history stored in database

---

## 📌 Design & UI

- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🌼 DaisyUI components only
- 🎨 Consistent color theme & spacing
- 💼 Professional dashboard layout
- ✨ Smooth animations using Framer Motion

---

## 🔗 GitHub Repositories

- **Client Repo:** [https://github.com/masumBillah-1/AssetVerse-Client-Site](https://github.com/masumBillah-1/AssetVerse-Client-Site)
- **Server Repo:** [https://github.com/masumBillah-1/AssetVerse-Server-Site](https://github.com/masumBillah-1/AssetVerse-Server-Site)

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### HR Routes (Protected)
- `GET /api/assets` - Get all company assets
- `POST /api/assets` - Add new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `GET /api/requests` - Get all asset requests
- `PUT /api/requests/:id/approve` - Approve request
- `PUT /api/requests/:id/reject` - Reject request
- `GET /api/employees` - Get company employees
- `POST /api/payment/upgrade` - Upgrade package

### Employee Routes (Protected)
- `POST /api/requests` - Request an asset
- `GET /api/my-assets` - Get assigned assets
- `PUT /api/assets/:id/return` - Return asset
- `GET /api/team` - Get team members

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [Masum Billah](https://github.com/masumBillah-1)


---

## 🙏 Acknowledgments

- Firebase for authentication
- MongoDB for database
- Stripe for payment processing
- All open-source contributors

---

<p align="center">Made with ❤️ by Your Name</p>
<p align="center">⭐ Star this repo if you find it helpful!</p>
