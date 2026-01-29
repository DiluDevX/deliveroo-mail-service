import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  jwt: {
    secret: string;
  };
  auth: {
    serviceUrl: string;
    validationMode: 'local' | 'remote';
  };
  logging: {
    level: string;
  };
}

function optionalEnv(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export const config: Config = {
  port: parseInt(optionalEnv('PORT', '3000'), 10),
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  jwt: {
    secret: optionalEnv('JWT_SECRET', 'secret'),
  },
  auth: {
    serviceUrl: optionalEnv('AUTH_SERVICE_URL', 'http://localhost:3001'),
    validationMode: optionalEnv('AUTH_VALIDATION_MODE', 'local') as 'local' | 'remote',
  },
  logging: {
    level: optionalEnv('LOG_LEVEL', 'info'),
  },
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';
