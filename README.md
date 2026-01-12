# 🏢 AssetVerse - Corporate Asset Management System

<p align="center">
  <img src="./public/assetverse-favicon.svg" alt="AssetVerse Logo" width="100" />
</p>

<p align="center">
  <strong>A modern B2B platform for managing corporate assets and employee allocations</strong>
</p>

<p align="center">
  <a href="https://asset-verse-client-site.vercel.app">🌐 Live Demo</a> •
  <a href="https://github.com/masumBillah-1/AssetVerse-Server-Site">🔗 Backend Repo</a>
</p>

---

## 📸 Website Preview

<p align="center">
  <img src="https://i.ibb.co.com/vvQhrPg8/Screenshot-14.png" alt="AssetVerse Website Preview" width="100%" />
</p>

---

## �[ Overview

AssetVerse helps organizations efficiently track company assets, manage employee requests, and maintain accountability across multiple teams. Built with React, Node.js, and MongoDB.

---

## ✨ Key Features

### For HR Managers
- 📦 Add, edit, and delete company assets
- ✅ Approve/reject employee asset requests
- 👥 Manage employee affiliations
- � View anaalytics with interactive charts
- 💳 Upgrade subscription packages via Stripe

### For Employees
- 🙋 Request assets from multiple companies
- 📋 View assigned assets across all companies
- 🔄 Return returnable items
- 👥 See team members by company

---

## 🔐 Demo Credentials

**HR Manager:**
- Email: `mb6517640@gmail.com`
- Password: `V5DAaj58xzfTmju`

---

## 🛠️ Tech Stack

**Frontend:** React • React Router • Tailwind CSS • DaisyUI • Framer Motion • Recharts

**Backend:** Node.js • Express • MongoDB • JWT • Stripe • Firebase Auth

---

## �e Quick Start

### Prerequisites
- Node.js v14+
- MongoDB
- npm/yarn

### Installation

```bash
# Clone repository
git clone https://github.com/masumBillah-1/AssetVerse-Client-Site.git
cd AssetVerse-Client-Site

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Firebase and API credentials

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_API_URL=your_backend_url
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## � Pagges & Routes

### Public
- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### HR Dashboard (`/hr-dashboard`)
- Asset List • Add Asset • All Requests • Employee List • Upgrade Package • Profile

### Employee Dashboard (`/em-dashboard`)
- My Assets • Request Asset • My Team • Profile

---

## 🎨 Design Highlights

- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Consistent color scheme (#063A3A, #CBDCBD)
- ✅ Smooth animations with Framer Motion
- ✅ Professional dashboard layouts
- ✅ Interactive charts and analytics

---

## 🔒 Security

- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Secure environment variables
- Input validation & sanitization

---

## 📊 Database Collections

```
users • assets • requests • packages • payments • notifications
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 👨‍💻 Author

**Masum Billah**

- GitHub: [@masumBillah-1](https://github.com/masumBillah-1)
- Email: mb6517640@gmail.com

---

<p align="center">
  Made with ❤️ in Bangladesh
</p>

<p align="center">
  ⭐ Star this repo if you find it helpful!
</p>
