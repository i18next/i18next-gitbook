<!-- toc -->
# Migration Guide

## v10.x.x to v11.0.0

- removes plugin of type cache. Can be replace by [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) example cache for localStorage [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend#getting-started)

- removes the support for multiload (multiRead) in backends - will just use read per language-namespace. You can enable multiRead support in backends again by using [i18next-multiload-backend-adapter](https://github.com/i18next/i18next-multiload-backend-adapter)

## v9.x.x to v10.0.0

brings pt, pt-PT, pt-BR plurals in line with, new pt reflects pt-BR and pt-PT gets a special case for plural handling http://www.unicode.org/cldr/charts/26/supplemental/language_plural_rules.html

code | locale | rule
-----|--------|----------
pt-PT|Portugal Portuguese|nplurals=2; plural=(n != 1);
pt_BR|Brazilian Portuguese|plurals=2; plural=(n > 1);
pt|Portuguese|plurals=2; plural=(n > 1);


## v8.x.x to v9.0.0

With v9 we removed the compatibility for the v1 API. So the `compatibilityAPI: 'v1'` flag won't do anything anymore.

You still can append this manually as we do for our old v1 tests - [learn more](https://github.com/i18next/i18next/blob/master/test/backward/v1.11.1.compat.js#L45-L52).

## v7.x.x to v8.0.0

The `nonExplicitWhitelist` flag was changed to be used in user detected language too, before it was restricted to defined fallback languages only.

```
i18next.init({
  fallbackLng: 'en',
  whitelist: ['de', 'en', 'zh'],
  nonExplicitWhitelist: true
});

// eg. `de-AT` will now pass the whitelist check
```

## v6.x.x to v7.0.0

We used to resolve nb-NO, nn-NO to no as language part mainly because there was no way to proper define per local fallbacks. With v7.0.0 we removed that to enable default behaviour also for norwegian language. To get back the old behaviour you can define multiple fallbacks like:

```
fallbackLng: {
  'nb': ['no', 'en'],
  'nn': ['no', 'en'],
  'default': ['en']
}
```

Additional starting from 7.0.0 you could use named exports:

```
import { init, t } from 'i18next';
```

## v5.x.x to v6.0.0

Return namespace in cimode with appendNamespaceToCIMode option (default now will only return key without namespace - independent of call to t function) [#863](https://github.com/i18next/i18next/issues/863)

This change might break your e2e tests if your depending on the cimode (the returned value can now be set to return always only key or ns+key)


## v4.x.x to v5.0.0

Nested keys should not be escaped [#854](https://github.com/i18next/i18next/issues/854)

i18next.cloneInstance() calls now init() (before it depended on having called that function with a callback) [#860](https://github.com/i18next/i18next/pull/860)


## v3.x.x to v4.0.0

There is only a small change for webpack2 builds which now targets es build with import/export in place to enable treeshaking (module entrypoint in package.json).

Nothing breaking for non webpack2 users.



## v2.x.x to v3.0.0

There is one breaking change regarding suffixing plurals in cases a language has multiple plural forms. Eg. arabic suffixes are now 0, 1, 2, 3, 4, 5 instead of 0, 1, 2, 3, 11, 100.

This change streamlines the suffix with the one used in gettext.

To enforce old behaviour you can enable `compatibilityJSON = 'v2'` on i18next init call.

```js
import i18next from 'i18next';

i18next.init({
  compatibilityJSON: 'v2'
}, (err, t) => { /* resources are loaded */ });
```


## v1.11.x to v2.0.0

While v2.0.0 is a full rewrite of the old codebase it should be possible to run in your app
without completely rewrite your integration.



### Getting started

The new version does not come with backend, cache and user language detection built in. i18next is more a core library that can be extended with modules on demand. This way it can be seamlessly used in browser, node.js or other javascript runtimes.

Modules are available on npm, via bower or on github to download.

### browser

```js
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import sprintf from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(XHR)
  .use(Cache)
  .use(LanguageDetector)
  .use(sprintf)
  .init(options, callback);
```

__hint for jquery user:__ use additional [jquery-i18next](https://github.com/i18next/jquery-i18next)

### nodejs

```js
var i18next = require('i18next'),
  FilesystemBackend = require('i18next-node-fs-backend'),
  sprintf = require('i18next-sprintf-postprocessor');

i18next
  .use(FilesystemBackend)
  .use(sprintf)
  .init(options, callback);
```

### nodejs + express

```js
var express = require('express');
  i18next = require('i18next'),
  FilesystemBackend = require('i18next-node-fs-backend'),
  sprintf = require('i18next-sprintf-postprocessor'),
  i18nextMiddleware = require('i18next-express-middleware');

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .use(sprintf)
  .init(options, callback);

var app = express();

app.use(i18nextMiddleware.handle(i18next)); // expose req.t with fixed lng
app.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18next)); // serves missing key route for consumers (browser)
app.get('/locales/resources.json', i18nextMiddleware.getResourcesHandler(i18next)); // serves resources for consumers (browser)

app.listen(3000);
```


### Running v2.0.0 with compatibility flags

Version 2.0.0 has a compatibility layer built in which allows to run it like v1.11.x. Keep in mind this layer will be removed in future version.

```js
import i18next from 'i18next';

i18next.init({
  compatibilityAPI: 'v1',
  compatibilityJSON: 'v1',
  // ...old options from v1
}, (err, t) => { /* resources are loaded */ });
```

option            | description
----------------- | -------------
compatibilityAPI  | Will convert init and t options and expose old API functions. Will be removed with future update.
compatibilityJSON | Will allow to use JSON files in v1 format. Using old interpolation prefix, suffix and no need for singular suffix [0] for singular in languages with more then just 1 plural form.


### Not supported any longer in v2.0.0

- __support for older browsers__:

  Beginning with v2 we target only modern browsers (Chrome, Firefox, ... and IE >= 10).

  For IE9 you will need to add a es5 shim

- __jquery__:

  use additional [jquery-i18next](https://github.com/i18next/jquery-i18next)

- __synchronous loading__:

  `i18next.init({ getAsync: false });`

  is not supported any longer - as not encouraged by browsers.

- __no conflict:__

  `i18n.noConflict();`

  was removed as i18next registers to window.i18next and no longer to window.i18n

- __indefinite article:__

  `i18n.t('myKey', { indefinite_article: true })`

  was removed - as the solution was too limited - reconsidering adding a better solution in a future v2 release