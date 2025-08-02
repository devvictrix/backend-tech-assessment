/backend-tech-assessment
├── prisma/
│ └── schema.prisma
├── specs/
│ └── PROJECT_STRUCTURE.md
├── src/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── auth.controller.ts
│ │ │ ├── auth.service.ts
│ │ │ ├── auth.repository.ts
│ │ │ ├── auth.routes.ts
│ │ │ └── dto/
│ │ ├── card/
│ │ │ ├── card.controller.ts
│ │ │ ├── card.service.ts
│ │ │ ├── card.repository.ts
│ │ │ ├── card.routes.ts
│ │ │ └── dto/
│ │ └── comment/
│ │ ├── comment.controller.ts
│ │ ├── comment.service.ts
│ │ │ ├── comment.repository.ts
│ │ │ ├── comment.routes.ts
│ │ │ └── dto/
│ ├── core/
│ │ ├── errors/
│ │ │ └── ApiError.ts
│ │ └── middleware/
│ │ ├── auth.middleware.ts
│ │ ├── errorHandler.middleware.ts
│ │ └── rateLimit.middleware.ts
│ ├── config/
│ │ ├── env.ts
│ │ ├── index.ts # Re-exports prisma
│ │ ├── logger.ts
│ │ └── swagger.ts
│ ├── app.ts
│ └── server.ts
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── package.json
