# JANDED Backend API

Complete backend API for **JANDED** - International Opportunities Platform for jobs and scholarships with visa sponsorship.

## 🚀 Features

- **Authentication System**: JWT-based auth with signup, login, password reset
- **Jobs Management**: CRUD operations, filtering, search, and categorization
- **Scholarships Management**: Full scholarship lifecycle management
- **User Profiles**: Comprehensive user profile management
- **Saved Items**: Bookmark jobs and scholarships
- **Applications Tracking**: Track application status and progress
- **Visa Sponsors Directory**: Browse verified visa sponsor companies
- **Newsletter System**: Email subscription management
- **Rate Limiting**: API protection against abuse
- **Security**: Helmet, CORS, input validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone and Install Dependencies

```bash
cd janded-backend
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE janded_db;
```

### 3. Environment Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=janded_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

### 4. Run Database Migrations

```bash
npm run migrate
```

### 5. Seed Sample Data (Optional)

```bash
npm run seed
```

This creates:
- Test user: `test@janded.com` / `Test123!`
- Sample jobs, scholarships, and visa sponsors

### 6. Start the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on: `http://localhost:5000`

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "country": "Nigeria"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "country": "Nigeria",
      "isVerified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "country": "Nigeria",
  "phone": "+234-XXX-XXXX",
  "bio": "Software engineer passionate about...",
  "linkedinUrl": "https://linkedin.com/in/johndoe"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!"
}
```

#### Request Password Reset
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Jobs Endpoints

#### Get All Jobs
```http
GET /api/jobs?page=1&limit=20&country=UK&category=Healthcare&visaSponsored=true&search=nurse
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `country` (optional): Filter by country
- `category` (optional): Filter by category
- `visaSponsored` (optional): Filter visa sponsored jobs (true/false)
- `jobType` (optional): Filter by job type (Full-time, Part-time, etc.)
- `search` (optional): Search in title, company, description
- `minSalary` (optional): Minimum salary filter
- `maxSalary` (optional): Maximum salary filter

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": 1,
        "title": "Registered Nurse",
        "company": "NHS Healthcare Trust",
        "location": "London, United Kingdom",
        "country": "United Kingdom",
        "flag": "🇬🇧",
        "salary": "£28,000 - £35,000",
        "type": "Full-time",
        "category": "Healthcare",
        "visaSponsored": true,
        "description": "...",
        "requirements": ["Nursing degree", "NMC registration"],
        "benefits": ["Visa sponsorship", "Health insurance"],
        "posted": "2025-01-09T12:00:00.000Z",
        "viewCount": 45,
        "applicationCount": 12
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

#### Get Single Job
```http
GET /api/jobs/:id
```

#### Get Job Categories
```http
GET /api/jobs/categories
```

#### Get Job Countries
```http
GET /api/jobs/countries
```

#### Create Job (Authenticated)
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Engineer",
  "company": "Tech Company",
  "location": "Berlin, Germany",
  "country": "Germany",
  "flag": "🇩🇪",
  "salary": "€55,000 - €75,000",
  "salaryMin": 55000,
  "salaryMax": 75000,
  "currency": "EUR",
  "jobType": "Full-time",
  "category": "Technology",
  "visaSponsored": true,
  "description": "Join our innovative team...",
  "requirements": ["Bachelor's degree", "2+ years experience"],
  "benefits": ["EU Blue Card", "Remote work"],
  "applicationUrl": "https://company.com/apply",
  "deadlineDate": "2025-12-31"
}
```

### Scholarships Endpoints

#### Get All Scholarships
```http
GET /api/scholarships?page=1&limit=20&country=UK&level=Master's&fundingType=Fully Funded
```

**Query Parameters:**
- `page`, `limit`, `country`, `search` (same as jobs)
- `level`: Filter by education level
- `fundingType`: Filter by funding type
- `category`: Filter by scholarship category

#### Get Single Scholarship
```http
GET /api/scholarships/:id
```

#### Get Scholarship Levels
```http
GET /api/scholarships/levels
```

#### Get Scholarship Countries
```http
GET /api/scholarships/countries
```

### User Items Endpoints (Authenticated)

#### Save Item (Job or Scholarship)
```http
POST /api/user/saved
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemType": "job",
  "itemId": 1,
  "notes": "Interesting position, need to update resume"
}
```

#### Get Saved Items
```http
GET /api/user/saved?itemType=job
Authorization: Bearer <token>
```

#### Remove Saved Item
```http
DELETE /api/user/saved/:id
Authorization: Bearer <token>
```

#### Create Application
```http
POST /api/user/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemType": "job",
  "itemId": 1,
  "coverLetter": "Dear Hiring Manager...",
  "resumeUrl": "https://example.com/resume.pdf",
  "notes": "Applied via company website"
}
```

#### Get Applications
```http
GET /api/user/applications?status=applied&itemType=job
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by status (applied, reviewing, interview, offer, accepted, rejected, withdrawn)
- `itemType`: Filter by type (job, scholarship)

#### Update Application Status
```http
PUT /api/user/applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "interview",
  "notes": "Interview scheduled for next week",
  "followUpDate": "2025-01-20"
}
```

#### Delete Application
```http
DELETE /api/user/applications/:id
Authorization: Bearer <token>
```

### Visa Sponsors Endpoints

#### Get All Visa Sponsors
```http
GET /api/visa-sponsors?country=UK&industry=Healthcare&page=1&limit=20
```

#### Get Single Visa Sponsor
```http
GET /api/visa-sponsors/:id
```

### Newsletter Endpoints

#### Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "preferences": {
    "jobAlerts": true,
    "scholarshipAlerts": true,
    "weeklyDigest": true
  }
}
```

#### Unsubscribe from Newsletter
```http
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Get Newsletter Stats
```http
GET /api/newsletter/stats
```

## 🔒 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

The token is returned when you register or login.

## 📊 Database Schema

### Users Table
- id, email, password (hashed), first_name, last_name
- profile_picture, country, phone, bio
- resume_url, linkedin_url
- is_verified, verification_token
- reset_token, reset_token_expiry
- created_at, updated_at

### Jobs Table
- id, title, company, location, country, flag
- salary, salary_min, salary_max, currency
- job_type, category, visa_sponsored
- description, requirements[], benefits[]
- application_url, company_logo, company_website
- posted_date, deadline_date, is_active
- view_count, application_count
- created_by, created_at, updated_at

### Scholarships Table
- id, name, organization, location, country, flag
- level, funding_type, deadline, category
- fields[], description, benefits[], eligibility[]
- application_url, organization_logo, is_active
- view_count, application_count
- created_by, created_at, updated_at

### Visa Sponsors Table
- id, company_name, country, industry
- visa_types[], active_positions, company_size
- website, description, logo_url
- success_rate, is_verified
- created_at, updated_at

### Saved Items Table
- id, user_id, item_type, item_id, notes
- created_at

### Applications Table
- id, user_id, item_type, item_id
- status, cover_letter, resume_url
- application_date, notes, follow_up_date
- created_at, updated_at

### Newsletter Subscriptions Table
- id, email, is_active
- subscribed_at, unsubscribed_at, preferences

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: express-validator for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Protection**: Configured CORS policies
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## 🚦 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `401`: Unauthorized
- `404`: Not Found
- `429`: Too Many Requests (Rate Limited)
- `500`: Internal Server Error

## 🧪 Testing

Test user credentials (after running seed):
- **Email**: test@janded.com
- **Password**: Test123!

## 📦 Project Structure

```
janded-backend/
├── src/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── jobsController.js    # Jobs management
│   │   ├── scholarshipsController.js
│   │   ├── userItemsController.js
│   │   └── miscController.js    # Visa sponsors & newsletter
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── validate.js          # Input validation
│   ├── models/                  # (Future: Sequelize/TypeORM models)
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── scholarships.js
│   │   ├── userItems.js
│   │   └── misc.js
│   ├── utils/                   # Helper functions
│   ├── database/
│   │   ├── migrate.js           # Database migrations
│   │   └── seed.js              # Sample data seeding
│   └── server.js                # Express app entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔄 Frontend Integration

### Setting up CORS

Update `FRONTEND_URL` in `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

### Making API Calls

```javascript
// Example: Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.data.token;

// Store token for future requests
localStorage.setItem('token', token);

// Example: Get jobs with auth
const jobsResponse = await fetch('http://localhost:5000/api/jobs', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | janded_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | JWT expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists: `psql -U postgres -l`

### Port Already in Use
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Migration Errors
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE janded_db;
CREATE DATABASE janded_db;
\q

# Re-run migration
npm run migrate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your needs!

## 👥 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for international opportunities seekers worldwide
# janded
