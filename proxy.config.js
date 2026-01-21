const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  server: {
    baseDir: "./",
    middleware: [
      createProxyMiddleware({
        target: 'https://localhost:8080',
        pathFilter: '/api',
        secure: false, // This allows the self-signed certificate
        changeOrigin: true
      })
    ]
  },
  files: ["*.html", "*.css", "*.js", "assets/**/*"],
  port: 3000,
  open: true
};