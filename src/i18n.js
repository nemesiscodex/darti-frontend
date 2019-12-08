
const NextI18Next = require('next-i18next').default;


const NextI18NextInstance = new NextI18Next({
    otherLanguages: ['es'],
    // localeSubpaths: {
    //     en: 'en',
    //     es: 'es',
    // },
    ignoreRoutes: [
        '/service-worker.js',
        '/static/',
        '/_next/',
    ]
});

module.exports = NextI18NextInstance;