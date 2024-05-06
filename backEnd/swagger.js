const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'LyLocBnB API',
    description: 'LyLocBnB endpoints'
  },
  host: 'localhost:8888',
  schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */




swaggerAutogen(outputFile, routes, doc);

