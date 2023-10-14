/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true,
  register: true,
  skipWaiting: true,
  runtimeCaching:[
    {
      urlPattern: '/',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'start-url',
        expiration: {
          maxEntries: 1
        }
      }
    },
  ]
})
module.exports = withPWA({
  reactStrictMode: true
});