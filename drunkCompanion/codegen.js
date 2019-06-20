const supportedLocales = ['en-US', 'de-DE'];
module.exports = supportedLocales.map((locale) => {
    return `import "app/translations/${locale}.js";`;
}).join('\n');