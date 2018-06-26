
module.exports.init = initRoutes;

function initRoutes(app) {
  let routesPath = app.get('root') + '/app/routes';

  app.use('/api', require(routesPath + '/auth'));
  app.use('/api', require(routesPath + '/tag'));
 // app.use('/api', require(routesPath + '/comment'));
  app.use('/api', require(routesPath + '/post'));
  app.use('/api', require(routesPath + '/category'));
  app.use('/api', require(routesPath + '/profile'));
};