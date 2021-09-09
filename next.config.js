const withPlugins = require('next-compose-plugins');
const withPwa = require('next-pwa');

module.exports = withPlugins([
  {
    reactStrictMode: true,
    images: {
      domains: ['emojicdn.elk.sh']
    }
  },
  [withPwa, {
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      dest: 'public',
      register: true,
      sw: '/sw.js'
    }
  }]
]);
