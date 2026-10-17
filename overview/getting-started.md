---
description: "Install i18next with npm or a CDN script, initialize it with resources, and call t() in Node.js, the browser or any framework."
---

# Getting started

## Installation

i18next can be added to your project using **npm** or **yarn**:

```bash
# npm
$ npm install i18next --save

# yarn
$ yarn add i18next
```

The default export is UMD compatible (commonjs, requirejs, global).

In the `/dist` folder you may find additional builds for commonjs, es6 modules. Optimized to load i18next in webpack, rollup, ... or node.js. The correct entry points are already configured in the package.json so there should be no extra setup to get the best build option.

## Load in [Deno](https://deno.land/)

i18next can be imported like this:

```javascript
import i18next from '@i18next/i18next' // when installed via JSR: deno add jsr:@i18next/i18next
// or import i18next from 'https://raw.githubusercontent.com/i18next/i18next/master/src/index.js'
// or import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js'
```

{% hint style="success" %}
In [this tutorial blog post](https://www.locize.com/blog/i18n-for-deno-with-i18next/?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_getting_started) you can check out how this works.[<br>](https://www.locize.com/blog/i18n-for-deno-with-i18next/?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_getting_started)[![](../.gitbook/assets/deno_i18next.jpg)](https://www.locize.com/blog/i18n-for-deno-with-i18next/?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_getting_started)
{% endhint %}

## Load from CDN

You can also directly add a script tag loading i18next from one of the CDNs providing it:

**unpkg.com**

* [https://unpkg.com/i18next/dist/umd/i18next.js](https://unpkg.com/i18next/dist/umd/i18next.js)
* [https://unpkg.com/i18next/dist/umd/i18next.min.js](https://unpkg.com/i18next/dist/umd/i18next.min.js)

esm or cjs:

* [https://unpkg.com/i18next/dist/esm/i18next.js](https://unpkg.com/i18next/dist/esm/i18next.js)
* [https://unpkg.com/i18next/dist/cjs/i18next.js](https://unpkg.com/i18next/dist/cjs/i18next.js)

Make sure to use a fixed version in production like [https://unpkg.com/i18next@26.0.0/dist/umd/i18next.js](https://unpkg.com/i18next@26.0.0/dist/umd/i18next.js) as passing no version will redirect to latest version which might contain breaking changes in future.

**cdnjs.com**

* [https://cdnjs.com/libraries/i18next](https://cdnjs.com/libraries/i18next)

**jsdelivr.com**

* [https://www.jsdelivr.com/package/npm/i18next](https://www.jsdelivr.com/package/npm/i18next)

## Important Caveat

Before we dive into the first sample, please note the following: By default, i18next uses a key-based notation to look up translations, which comes with the benefit of [additional structure](../translation-function/essentials.md) for your translation files.

The downside of this is that your keys must not be in natural language — the names of the keys are not used as fallback content and the key names must not include reserved characters `:` and `.` since those are used by i18next.

If you prefer using natural language in keys, please read the [fallback guide](../principles/fallback.md#key-fallback).

## Basic sample

Please be aware these samples are just showing basic usage of the core functionality. For production usage please consider using one of our [framework integrations](supported-frameworks.md) to get better and simpler integrations (Setting innerHTML is just done to show how it works).

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
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
document.getElementById('output').innerHTML = i18next.t($ => $.key);
```
{% endtab %}
{% endtabs %}

Or using callback init signature:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
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
  document.getElementById('output').innerHTML = i18next.t($ => $.key);
});
```
{% endtab %}
{% endtabs %}

Or using Promises:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
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
  document.getElementById('output').innerHTML = i18next.t($ => $.key);
});
```
{% endtab %}
{% endtabs %}

Or using async/await:

{% tabs %}
{% tab title="JavaScript" %}
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
{% endtab %}

{% tab title="TypeScript" %}
```typescript
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
document.getElementById('output').innerHTML = i18next.t($ => $.key);
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
if you are [lazy loading the translation resources](../how-to/add-or-load-translations.md), you may need to wait for i18next to have finished to initialize.
{% endhint %}

As you might see, this basic sample provides only one language directly added on init… let's extend this to have buttons to change language from English to German:

[source code](https://jsfiddle.net/jamuhl/dvk0e8a9/#tabs=js,result,html)

{% hint style="info" %}
Do you quickly want to translate your resources to other languages?\
Try: [https://translate.i18next.com](https://translate.i18next.com/)

Want to check your files for missing translations or interpolation errors?\
Try the free [i18n health check](https://translate.i18next.com/health-check).

Starting from an app full of hardcoded strings?\
Run the free [i18n readiness check](https://translate.i18next.com/repo-check) on your GitHub repository.
{% endhint %}

This is a working sample showing translated text. To learn more, have a look at the following extended sample:

## Extended sample

The extended sample adds the language detector for our browser and the http-backend to load translation files from this documentation's [i18next-gitbook repo](https://github.com/i18next/i18next-gitbook/tree/master/locales).

[source code](https://jsfiddle.net/jamuhl/ferfywyf/525/)

## Choose your message syntax

The samples above use the i18next JSON format. Two plugins let you write your messages in another syntax instead. Pick one before your translation files grow: switching later means converting every message, and one i18next instance uses one syntax.

**i18next JSON** (the default) uses `{{name}}` for values and key suffixes for plurals and context:

```json
{
  "greeting": "Hello {{name}}!",
  "photos_one": "You have one photo.",
  "photos_other": "You have {{count}} photos."
}
```

Pick it unless you have a reason not to. Every i18next feature, plugin and tool supports it, including [nesting](../translation-function/nesting.md), [formatting](../translation-function/formatting.md), [context](../translation-function/context.md) and [i18next-cli](https://github.com/i18next/i18next-cli).

**ICU MessageFormat** via [i18next-icu](https://github.com/i18next/i18next-icu) puts plurals and selects into the message:

```json
{
  "greeting": "Hello {name}!",
  "photos": "You have {count, plural, one {one photo} other {# photos}}."
}
```

Pick it if your translations are already in ICU, if your translators or translation management system expect ICU, or if you share messages with other ICU based libraries like FormatJS.

**MessageFormat 2 (MF2)** via [i18next-mf2](https://github.com/i18next/i18next-mf2) is the Unicode successor of ICU MessageFormat:

```json
{
  "greeting": "Hello {$name}!",
  "photos": ".input {$count :number} .match $count one {{You have one photo.}} * {{You have {$count} photos.}}"
}
```

Pick it if you start fresh and want the newer Unicode standard. Check first that your translation tools can handle MF2 messages.

With all three, `i18next.t('photos', { count: 3 })` returns "You have 3 photos.". ICU and MF2 replace i18next's own message handling, so plural and context suffix keys, `$t()` nesting, i18next formatters and `returnObjects` stop working. Read [Using ICU or MF2](../how-to/using-icu-or-mf2.md) before you switch.

You should now have an idea about how to achieve the basic setup. It's time to learn more about:

* The translation functions like [interpolation](../translation-function/interpolation.md), [formatting](../translation-function/formatting.md) and [plurals](../translation-function/plurals.md).
* Find an [extension for your project](supported-frameworks.md), eg. **react-i18next**, **jquery-i18next** and **others**. Using those wrappers around i18next makes using i18next a lot simpler in your project. Most of such modules come with extended examples.
* Find out more about the [configuration options](configuration-options.md).
* Set up [type-safe translations with TypeScript](typescript.md).
* Add a [language detector](plugins-and-utils.md) to detect the preferred language of your user
* Add a [backend plugin](plugins-and-utils.md) to load the translations from the server or filesystem
* Connect i18next with a smart [Translation Management System](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_getting_started\&from=i18next_overview-getting-started__nextsteps), like in [this React.js example](https://github.com/locize/react-tutorial)

{% hint style="success" %}
Don't have a [Locize](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_getting_started\&from=i18next_overview-getting-started__hint) account yet?\
You can now sign up for a **Free plan** to test the integration in your development environment indefinitely.
{% endhint %}
