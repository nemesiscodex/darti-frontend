
const NextI18Next = require('next-i18next').default;


const NextI18NextInstance = new NextI18Next({
    otherLanguages: ['es'],
    localeSubpaths: {
        en: 'en',
        es: 'es',
    },
});

module.exports = NextI18NextInstance;