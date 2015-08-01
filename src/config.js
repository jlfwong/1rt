module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    httpsPort: 3443,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    httpsPort: process.env.HTTPS_PORT,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
