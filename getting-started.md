<!-- toc -->
# Getting started

## Installation

i18next can be added to your project using **npm** or **bower**:

```bash
# npm
$ npm install i18next --save

# bower
$ bower install i18next
```

The default export is UMD compatible (commonjs, requirejs, global).

In the `/dist` folder you find additional builds for commonjs, es6 modules. Optimized to load i18next in webpack, rollup, ... or node.js. The correct entry points are already configured in the package.json so there should be no extra setup to get the best build option.

## Load from CDN

You can also directly add a script tag loading i18next from one of the CDNs providing it:

**unpkg.com**

- [https://unpkg.com/i18next/i18next.js](https://unpkg.com/i18next/i18next.js)
- [https://unpkg.com/i18next/i18next.min.js](https://unpkg.com/i18next/i18next.min.js)

**cdnjs.com**

- [https://cdnjs.com/libraries/i18next](https://cdnjs.com/libraries/i18next)


## Basic sample

```js
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
}, function(err, t) {
  // initialized and ready to go!
  document.getElementById('output').innerHTML = i18next.t('key');
});
```

As you might see this basic sample provides only one language directly added on init...lets extend this to have buttons to change language from english to german:

[source code](https://jsfiddle.net/jamuhl/dvk0e8a9/#tabs=js,result,html)

This is a working sample showing translated text. To lear more have a look at the following extended sample.

## Extended sample

The extended sample adds the language detector for browser and the xhr-backend to load translation files from this documentation's [i18next-gitbook repo](https://github.com/i18next/i18next-gitbook/tree/master/locales).

[source code](https://jsfiddle.net/jamuhl/ferfywyf/#tabs=js,result,html)

You now have an idea about the basic setup. It's time to learn more about:

- The translation functions like [interpolation](/interpolation.md), [formatting](/formatting.md) and [plurals](/plurals.md).
- Find an [extension for your project](/supported-frameworks.md), eg. **react-i18next**, **jquery-i18next** and **others**. Using those wrappers around i18next makes using i18next a lot simpler in your project. Most such modules come with extended examples.
- Add a [language detector](/plugins-and-utils.md) to detect the preferred language of your user
- Add a [backend plugin](/plugins-and-utils.md) to load the translations from the server or filesystem



