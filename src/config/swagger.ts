import swaggerJsdoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { env } from './env';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Robinhood Pre-Interview Assessment API',
            version: '1.0.0',
            description: 'A REST API for managing cards and comments, built with Express.js, Prisma, and Zod.',
        },
        servers: [
            {
                url: env.APP_URL,
                description: `${env.NODE_ENV} server`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/api/**/*.routes.ts', './src/api/**/dto/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // Also update the console logs to be dynamic
    console.log(`Swagger UI is available at ${env.APP_URL}/api-docs`);
    console.log(`Swagger JSON is available at ${env.APP_URL}/api-docs.json`);
}