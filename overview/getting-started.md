# Getting started

## Installation

i18next can be added to your project using **npm** or **yarn**:

```bash
# npm
$ npm install i18next --save

# yarn
$ yarn add i18next
```

The default export is UMD compatible \(commonjs, requirejs, global\).

In the `/dist` folder you may find additional builds for commonjs, es6 modules. Optimized to load i18next in webpack, rollup, ... or node.js. The correct entry points are already configured in the package.json so there should be no extra setup to get the best build option.

## Load in [Deno](https://deno.land/)

i18next can be imported like this:

```javascript
import i18next from 'https://deno.land/x/i18next/index.js'
// or import i18next from 'https://raw.githubusercontent.com/i18next/i18next/master/src/index.js'
// or import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js'
```

## Load from CDN

You can also directly add a script tag loading i18next from one of the CDNs providing it:

**unpkg.com**

* [https://unpkg.com/i18next/dist/umd/i18next.js](https://unpkg.com/i18next/dist/umd/i18next.js)
* [https://unpkg.com/i18next/dist/umd/i18next.min.js](https://unpkg.com/i18next/dist/umd/i18next.min.js)

esm or cjs:

* [https://unpkg.com/i18next/dist/esm/i18next.js](https://unpkg.com/i18next/dist/esm/i18next.js)
* [https://unpkg.com/i18next/dist/cjs/i18next.js](https://unpkg.com/i18next/dist/cjs/i18next.js)

Make sure to use a fixed version in production like [https://unpkg.com/i18next@17.0.0/dist/umd/i18next.js](https://unpkg.com/i18next/dist/umd/i18next.js) as passing no version will redirect to latest version which might contain breaking changes in future.

**cdnjs.com**

* [https://cdnjs.com/libraries/i18next](https://cdnjs.com/libraries/i18next)

## Important Caveat

Before we dive into the first sample, please note the following: By default, i18next uses a key-based notation to look up translations, which comes with the benefit of [additional structure](../translation-function/essentials.md) for your translation files.

The downside of this is that your keys must not be in natural language — the names of the keys are not used as fallback content and the key names must not include reserved characters `:` and `.` since those are used by i18next.

If you prefer using natural language in keys, please read the [fallback guide](../principles/fallback.md#key-fallback).

## Basic sample

Please be aware these samples are just showing basic usage of the core functionality. For production usage please consider using one of our [framework integrations](supported-frameworks.md) to get better and simpler integrations \(Setting innerHTML is just done to show how it works\).

```javascript
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
});
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
document.getElementById('output').innerHTML = i18next.t('key');
```

Or using callback init signature:

```javascript
import i18next from 'i18next';

i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
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

Or using Promises:

```javascript
i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
}).then(function(t) {
  // initialized and ready to go!
  document.getElementById('output').innerHTML = i18next.t('key');
});
```

Or using async/await:

```javascript
await i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  }
});
// initialized and ready to go!
document.getElementById('output').innerHTML = i18next.t('key');
```

{% hint style="info" %}
if you are [lazy loading the translation resources](../how-to/add-or-load-translations.md), you may need to wait for i18next to have finished to initialize.
{% endhint %}

As you might see, this basic sample provides only one language directly added on init… let's extend this to have buttons to change language from English to German:

[source code](https://jsfiddle.net/jamuhl/dvk0e8a9/#tabs=js,result,html)

This is a working sample showing translated text. To learn more, have a look at the following extended sample:

## Extended sample

The extended sample adds the language detector for our browser and the http-backend to load translation files from this documentation's [i18next-gitbook repo](https://github.com/i18next/i18next-gitbook/tree/master/locales).

[source code](https://jsfiddle.net/jamuhl/ferfywyf/525/)

You should now have an idea about how to achieve the basic setup. It's time to learn more about:

* The translation functions like [interpolation](../translation-function/interpolation.md), [formatting](../translation-function/formatting.md) and [plurals](../translation-function/plurals.md).
* Find an [extension for your project](supported-frameworks.md), eg. **react-i18next**, **jquery-i18next** and **others**. Using those wrappers around i18next makes using i18next a lot simpler in your project. Most of such modules come with extended examples.
* Find out more about the [configuration options](configuration-options.md).
* Add a [language detector](plugins-and-utils.md) to detect the preferred language of your user
* Add a [backend plugin](plugins-and-utils.md) to load the translations from the server or filesystem
* Connect i18next with a smart [Translation Management System](https://locize.com), like in [this React.js example](https://github.com/locize/react-tutorial)

