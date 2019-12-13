
const NextI18Next = require('next-i18next').default;


const NextI18NextInstance = new NextI18Next({
  otherLanguages: ['es'],
  ignoreRoutes: [
    '/service-worker.js',
    '/static/',
    '/_next/',
  ],
  localePath: './public/static/locales',
});

module.exports = NextI18NextInstance;
