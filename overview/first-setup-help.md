---
description: Let's try to figure out what you need.
---

# First setup help

* [For which environment are you looking for an i18n solution?](first-setup-help.md#for-which-environment-are-you-looking-for-an-i-18-n-solution)
  * [Special handling for serverless environments (AWS lambda, Google Cloud Functions, Azure Functions, etc...)](first-setup-help.md#special-handling-for-serverless-environments-aws-lambda-google-cloud-functions-azure-functions-etc)
* [Do you need a language detector for your environment?](first-setup-help.md#do-you-need-a-language-detector-for-your-environment)
* [Do you want to bundle the translations with your app?](first-setup-help.md#do-you-want-to-bundle-the-translations-with-your-app)
* [Do you want to load the translations separate from your app via http?](first-setup-help.md#do-you-want-to-load-the-translations-separate-from-your-app-via-http)
* [Do you want to manage your translations with an awesome translation management system?](first-setup-help.md#do-you-want-to-manage-your-translations-with-an-awesome-translation-management-system)

## For which environment are you looking for an i18n solution?

[Client](https://react.i18next.com/), [server](https://github.com/i18next/i18next-http-middleware), [browser](https://github.com/i18next/jquery-i18next), [React](https://react.i18next.com), [mobile](https://github.com/i18next/react-i18next/tree/master/example/ReactNativeProject), [desktop](https://github.com/i18next/react-i18next/tree/master/example/react_native_windows), [Node.js](https://github.com/i18next/i18next-fs-backend/blob/master/example/node/index.js), [Deno](https://github.com/i18next/i18next-fs-backend/blob/master/example/deno/index.js)...

There are a lot of appropriate libraries. [Have a look at this list.](supported-frameworks.md)

### Special handling for serverless environments (AWS lambda, Google Cloud Functions, Azure Functions, etc...)

Make use of [i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)

```javascript
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const backend = new Backend({
  // path where resources get loaded from
  loadPath: '/locales/{{lng}}/{{ns}}.json'
});

i18next
  .use(backend)
  .init({
    // initImmediate: false, // setting initImediate to false, will load the resources synchronously
    ...opts,
    ...yourOptions
  }); // yourOptions should not include backendOptions!
```

or just [import/require](https://www.i18next.com/how-to/add-or-load-translations#add-on-init) your files directly

```javascript
import i18next from 'i18next';
import en from './locales/en.json'
import de from './locales/de.json'

i18next
  .init({
    ...opts,
    ...yourOptions,
    resources: {
      en,
      de
    }
  });
```

## Do you need a language detector for your environment?

* for example for the browser: [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)
* for example for http server (express, Fastify, etc...): [i18next-http-middleware](https://github.com/i18next/i18next-http-middleware#language-detection)
* [there are other plugins here](https://www.i18next.com/overview/plugins-and-utils#language-detector)

## Do you want to bundle the translations with your app?

* [you can add translations on init](../how-to/add-or-load-translations.md#add-on-init)
* [you can add translations after init](../how-to/add-or-load-translations.md#add-after-init)
* [you can lazy load translations via dynamic import](../how-to/add-or-load-translations.md#lazy-load-in-memory-translations)
* on server side: [you can load translations from filesystem](https://github.com/i18next/i18next-fs-backend)

## Do you want to load the translations separate from your app via http?

* served from your own endpoint: [i18next-http-backend](https://github.com/i18next/i18next-http-backend)
* served from a professional CDN of a translation management system: [i18next-locize-backend](https://github.com/locize/i18next-locize-backend)
* [there are a lot of other backend possibilities here](plugins-and-utils.md#backends)

## Do you want to manage your translations with an awesome translation management system?

### [Ready to take i18next to the next level?](for-enterprises.md)
