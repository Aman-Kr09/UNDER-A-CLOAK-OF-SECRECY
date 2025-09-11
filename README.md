# EVILSTASH

A modern, secure messaging platform built with Next.js 15, featuring user authentication, email verification, and real-time messaging capabilities.

## ✨ Features

- **🔐 Complete Authentication System**
  - User registration with email verification
  - Password hashing with bcryptjs
  - Duplicate username/email checking
  - Secure JWT-based authentication

- **📧 Email Verification System**
  - Beautiful HTML email templates with React Email
  - 6-digit verification codes
  - Resend integration for reliable email delivery
  - Automatic code expiry (1 hour)

- **💬 Messaging Platform**
  - Anonymous message sending/receiving
  - User preference controls for message acceptance
  - Message history and management

- **🛠️ Technical Stack**
  - **Next.js 15** with Turbopack for lightning-fast development
  - **TypeScript** for type safety and better DX
  - **Tailwind CSS** for modern, responsive styling
  - **MongoDB** with Mongoose for robust data management
  - **Zod** for comprehensive schema validation
  - **React Email** for professional email templates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Resend API key for email service

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aman-Kr09/evilstash.git
   cd evilstash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your actual values:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── sign-up/         # User registration endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── lib/
│   ├── dbConnect.ts         # MongoDB connection utility
│   └── resend.ts            # Email service configuration
├── model/
│   └── User.tsx             # User database model
├── schemas/                 # Zod validation schemas
│   ├── signUpSchema.ts      # User registration validation
│   ├── signInSchema.ts      # User login validation
│   ├── verifySchema.ts      # Email verification validation
│   ├── messageSchema.ts     # Message validation
│   └── acceptMessageSchema.ts # Message preference validation
├── helpers/
│   └── sendVerificationEmail.ts # Email sending utility
└── types/
    └── ApiResponse.ts       # API response type definitions
emails/
└── VerificationEmail.tsx    # React Email template
```

## 🔌 API Endpoints

### Authentication
- `POST /api/sign-up` - Register new user with email verification

*More endpoints coming soon...*

## 🛡️ Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **Email Verification**: Mandatory email verification for account activation
- **Input Validation**: Comprehensive Zod schema validation
- **Error Handling**: Secure error responses without sensitive data leakage
- **Environment Protection**: All sensitive data in environment variables

## 🎨 Email Templates

Professional, responsive email templates built with React Email:
- Welcome verification emails
- Password reset notifications
- Account security alerts

## 📦 Dependencies

### Core
- `next` - React framework for production
- `react` & `react-dom` - React library
- `typescript` - Type safety

### Database & Validation
- `mongoose` - MongoDB object modeling
- `zod` - TypeScript-first schema validation

### Authentication & Security
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling

### Email System
- `react-email` - React email templates
- `@react-email/components` - Email component library
- `resend` - Email delivery service

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `@tailwindcss/postcss` - PostCSS integration

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-231220008@nitdelhi.ac.in or open an issue on GitHub.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
