const env = process.env;

const config = {
  api: { 
    host: env.API_HOST || 'localhost:3001',
    protocol: env.API_PROTOCOL || 'http',
  },
};

module.exports = config;