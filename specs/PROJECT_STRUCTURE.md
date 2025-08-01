/backend-tech-assessment
├── prisma/
│ └── schema.prisma # Prisma schema file
├── src/
│ ├── api/ # Main folder for all API modules
│ │ ├── auth/ # Authentication module
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ ├── auth.routes.ts
│ │ │ └── dto/ # Zod schemas for validation
│ │ ├── cards/ # Cards module
│ │ │ ├── cards.controller.ts
│ │ │ ├── cards.service.ts
│ │ │ └── cards.routes.ts
│ │ └── comments/ # Comments module
│ │ ├── comments.controller.ts
│ │ ├── comments.service.ts
│ │ └── comments.routes.ts
│ ├── core/ # Core functionalities
│ │ └── middleware/
│ │ ├── auth.middleware.ts
│ │ └── rateLimit.middleware.ts
│ ├── config/ # Configuration files (e.g., env variables)
│ ├── app.ts # Express app setup, middleware registration
│ └── server.ts # Server startup logic
├── .env # Environment variables
├── .gitignore
├── Dockerfile # Dockerfile for the API service
├── docker-compose.yml # Docker Compose to run app and DB
└── package.json
