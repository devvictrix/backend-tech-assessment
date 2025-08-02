import pino from 'pino';
import { env } from '@/config/env';

const pinoConfig =
    env.NODE_ENV === 'production'
        ?
        {
            level: 'info',
        }
        :
        {
            level: 'debug',
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
                    ignore: 'pid,hostname',
                },
            },
        };

export const logger = pino(pinoConfig);