# Deliveroo Mail Service

A microservice for handling email operations including password reset emails and other transactional emails for the Deliveroo platform.

## Features

- ⚡ **Express.js** - Fast, unopinionated web framework
- 🔷 **TypeScript** - Type safety and better DX
- 📧 **Nodemailer** - Email sending via SMTP
- ✅ **Zod Validation** - Schema validation for requests
- 📝 **Swagger/OpenAPI** - Auto-generated API documentation
- 🐳 **Docker** - Production and development containers
- 🚀 **GitHub Actions** - CI/CD pipeline for AWS ECS deployment
- 📊 **Pino Logging** - Structured JSON logging for production
- 🎨 **HTML Email Templates** - Professional, responsive email designs

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/deliveroo-mail-service.git
cd deliveroo-mail-service
```

### 2. Install dependencies

```bash
corepack enable  # Enable Yarn
yarn install
```

### 3. Set up environment

```bash
cp .env.example .env
# Edit .env with your SMTP and company configuration values
```

Required environment variables:

- `SMTP_HOST` - Your SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP authentication user
- `SMTP_PASS` - SMTP authentication password
- `COMPANY_NAME` - Your company name (e.g., "Deliveroo")
- `COMPANY_EMAIL` - Sender email address
- `LOGO_URL` - URL to your company logo
- `SUPPORT_EMAIL` - Support email address
- `APP_URL` - Your application URL for password reset links

### 4. Start development server

```bash
yarn dev
```

Visit:

- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/health

## API Endpoints

### Email Operations

#### Send Password Reset Email

```http
POST /api/mail/password-reset
Content-Type: application/json

{
  "email": "user@example.com",
  "resetToken": "secure-token-here"
}
```

Sends a password reset email to the specified email address with a secure reset link.

### Health Checks

| Endpoint            | Purpose            |
| ------------------- | ------------------ |
| `GET /health`       | Basic health check |
| `GET /health/ready` | Readiness probe    |
| `GET /health/live`  | Liveness probe     |

## Project Structure

```
├── .aws/                    # AWS ECS task definitions
├── .github/workflows/       # CI/CD pipelines
├── src/
│   ├── config/              # Configuration (mail, server)
│   ├── controllers/         # Route handlers
│   ├── dto/                 # Data transfer objects
│   ├── middleware/          # Express middleware
│   ├── routes/              # API route definitions
│   ├── schemas/             # Zod validation schemas
│   ├── services/            # Email service logic
│   ├── templates/           # HTML email templates
│   ├── utils/               # Utility functions
│   ├── server.ts            # App entry point
│   └── swagger.ts           # API documentation config
├── Dockerfile               # Production Docker image
├── Dockerfile.dev           # Development Docker image
├── docker-compose.yaml      # Production compose
└── docker-compose.dev.yaml  # Development compose
```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `yarn dev`        | Start development server with hot reload |
| `yarn build`      | Compile TypeScript to `dist/`            |
| `yarn start`      | Run compiled production build            |
| `yarn lint`       | Run ESLint                               |
| `yarn lint:fix`   | Fix ESLint issues                        |
| `yarn format:fix` | Format code with Prettier                |
| `yarn typecheck`  | Run TypeScript type checking             |

## Email Templates

The service includes professional, responsive HTML email templates:

- **Password Reset** (`src/templates/reset-password.ts`) - Styled email with reset button and security information
- **Verification** (`src/templates/verification.html`) - Email verification template

To add a new template:

1. Create a new template function in `src/templates/`
2. Add the sending logic to `src/services/mail.service.ts`
3. Create a controller in `src/controllers/mail.controller.ts`
4. Add the route in `src/routes/mail.routes.ts`
5. Define validation schema in `src/schemas/mail.schema.ts`

## Configuration

### Mail Configuration

Edit `src/config/mail.config.ts` to configure:

```typescript
export const mailConfig = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  companyName: process.env.COMPANY_NAME,
  companyEmail: process.env.COMPANY_EMAIL,
  logoUrl: process.env.LOGO_URL,
  supportEmail: process.env.SUPPORT_EMAIL,
  appUrl: process.env.APP_URL,
};
```

### SMTP Providers

The service works with any SMTP provider:

- **Gmail** - Use App Passwords
- **SendGrid** - Use API key as password
- **AWS SES** - Use SMTP credentials
- **Mailgun** - Use SMTP credentials
- **Custom SMTP server**

## AWS Deployment

### Prerequisites

1. AWS Account with:

   - ECR repository created
   - ECS cluster and service configured
   - Secrets stored in AWS Secrets Manager (SMTP credentials)

2. GitHub Secrets configured:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

### Deploy

Push to `main` branch to trigger automatic deployment, or manually trigger via GitHub Actions.

## Middleware

### Validation

```typescript
import { validateBody } from './middleware/validate.middleware';

router.post('/mail/send', validateBody(emailSchema), handler);
```

All requests are validated using Zod schemas defined in `src/schemas/`.

## License

MIT
