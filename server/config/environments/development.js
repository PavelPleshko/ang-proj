
module.exports={
	port:8080,
	hostname:'127.0.0.1',
	baseUrl:'http://localhost:8080',
	 mongodb: {
    uri: 'mongodb://admin:presentik12@ds159400.mlab.com:59400/confessions_project',
    dbTimeout:15000
  },
  app: {
    name: 'Confessions'
  },
  serveStatic: true,
  session: {
    type: 'mongo',
    secret: 'u+J%E^9!hx?piXLCfiMY.EDc',
    resave: false,
    saveUninitialized: true
  }
}