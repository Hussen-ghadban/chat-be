# Chat App Backend

A real-time chat application backend built with Express.js, TypeScript, Socket.IO, and PostgreSQL.

## 🚀 Features

- Real-time messaging with Socket.IO
- RESTful API endpoints
- PostgreSQL database with Prisma ORM
- TypeScript for type safety
- CORS enabled for cross-origin requests
- Hot reload development environment

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Real-time**: Socket.IO
- **Development**: Nodemon, ts-node

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hussen-ghadban/chat.git
   cd chat-app-be
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/chat_app_db"
   
   # Server
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   yarn prisma generate
   
   # Run database migrations
   yarn prisma migrate dev
   ```

## 🚀 Running the Application

### Development Mode
```bash
yarn dev
```
This starts the server with hot reload on `http://localhost:3000`

### Production Mode
```bash
# Build the application
yarn build

# Start the production server
yarn start
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server with hot reload |
| `yarn build` | Build TypeScript to JavaScript |
| `yarn start` | Start production server |

<!-- ## 🗂️ Project Structure

```
chat-app-be/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Application entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── dist/                # Compiled JavaScript (generated)
├── .env                 # Environment variables
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send a new message
- `DELETE /api/messages/:id` - Delete a message

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

## 🗄️ Database Schema

The application uses Prisma ORM with PostgreSQL. Key models include:

- **User**: User accounts and profiles
- **Message**: Chat messages
- **Room**: Chat rooms/channels
- **UserRoom**: User-room relationships

To view the complete schema, check `prisma/schema.prisma`.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 3000 |
| `JWT_SECRET` | Secret for JWT tokens | Required |
| `CORS_ORIGIN` | Allowed CORS origins | * |

## 🧪 Testing

```bash
# Run tests (if implemented)
yarn test

# Run tests in watch mode
yarn test:watch
```

### Using Docker
```bash
# Build Docker image
docker build -t chat-app-be .

# Run container
docker run -p 3000:3000 chat-app-be
``` -->

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database credentials

**Port Already in Use**
- Change PORT in .env file
- Kill process using the port: `lsof -ti:3000 | xargs kill -9`

**Prisma Issues**
- Regenerate client: `npx prisma generate`
- Reset database: `npx prisma migrate reset`
