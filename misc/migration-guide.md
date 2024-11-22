# Migration Guide

### v23.x.x to v24.0.0

* remove support for older environments
* remove old i18next [JSON formats](json-format.md)
  * to convert your existing [v3](json-format.md#i18next-json-v3) translations to the [v4](json-format.md#i18next-json-v4) format, have a look at [i18next-v4-format-converter](https://github.com/i18next/i18next-v4-format-converter) or this [web tool](https://i18next.github.io/i18next-v4-format-converter-web/).
* remove support for compatibility to the very first [v1 API](https://www.i18next.com/misc/the-history-of-i18next) ([old docs](https://i18next.github.io/i18next/))
* [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) is mandatory now and will not fallback anymore, use a polyfill ([`Intl.PluralRules`](https://github.com/eemeli/intl-pluralrules) and [`Intl.getCanonicalLocales`](https://formatjs.github.io/docs/polyfills/intl-getcanonicallocales/)) if your environment does not support it.
  * for those who really need the old behaviour, needs to create a compatibility layer similar to [this](https://github.com/i18next/i18next/blob/6b3b06057a3c5aee8e4900ef0731a3cf9254a4fa/test/compatibility/v4/v4Compatibility.js).
* renamed `initImmediate` to `initAsync`
* fallback to `dev` language if plural rule not found

#### TypeScript

* Now only `typescript >5` versions are supported. `v4` types are now removed from the codebase.
* `jsonFormat` option has been removed. When a new json version will be released you can can use `compatibilityJSON` option. which now only accepts `v4` as value.

### v22.x.x to v23.0.0

#### Redesigned [TypeScript types](../overview/typescript.md)

[This PR](https://github.com/i18next/i18next/pull/1911) redesigned the types to be less complex, faster and easier to maintain.\\

The redesign endeavors to enhance the approach to parsing and inferring keys for the `t` function. Instead of performing a recursive examination of each key-value pair in `resources` associated with specific namespace(s) each time the `t` function is invoked, we generate a comprehensive set of keys from all namespaces just once.

Make sure your tsconfig compilerOptions has the [`strict`](https://www.typescriptlang.org/tsconfig#strict) flag or the [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) set to `true`.

Also use TypeScript v5.

#### Codemods

To assist with the upgrade from i18n `v22.x.x` to `v23.0.0`, [Codemod](https://github.com/codemod-com/codemod) provides open-source codemods that automatically transform your code to many of the new APIs and patterns.

These following codemods are available (see the notes in the "More information" section below):

* [`i18next/23/add-namespace-type-annotation`](https://go.codemod.com/i18n-namespace-type-annotation)
* [`i18next/23/remove-options`](https://go.codemod.com/i18n-remove-options)
* [`i18next/23/replace-keys`](https://go.codemod.com/i18n-replace-keys)

<details>

<summary>More information: Features and Breaking changes</summary>

**Features**

* When loading multiple namespaces ([react-i18next](https://react.i18next.com)), `t` function will infer and accept the keys for the first namespace. So this pattern will be accepted now:

[![Screenshot 2023-02-12 at 9 40 06 PM](https://user-images.githubusercontent.com/12190482/218372236-c7dcc9c5-6c7c-434f-8259-cbba17a03ac6.png)](https://user-images.githubusercontent.com/12190482/218372236-c7dcc9c5-6c7c-434f-8259-cbba17a03ac6.png)

* `t` function will now infer and accept the keys for the main namespace (i18next):

[![Screenshot 2023-02-12 at 9 48 31 PM](https://user-images.githubusercontent.com/12190482/218373106-ca291bfa-4df0-48bf-b4be-1ca07282373c.png)](https://user-images.githubusercontent.com/12190482/218373106-ca291bfa-4df0-48bf-b4be-1ca07282373c.png)

* We're introducing a new type (`returnObjects`) that will infer fewer keys if set to `false`, and all keys and sub-keys if set to `true`. If the option `returnObjects` from `t` function is set to `true`, it'll work the same way:

[![Screenshot 2023-02-12 at 9 52 07 PM](https://user-images.githubusercontent.com/12190482/218373749-bba70379-23b3-483d-8cee-241736be43ad.png)](https://user-images.githubusercontent.com/12190482/218373749-bba70379-23b3-483d-8cee-241736be43ad.png)

[![Screenshot 2023-02-12 at 9 57 43 PM](https://user-images.githubusercontent.com/12190482/218374305-219b2c51-783a-4753-9df8-450b45f92132.png)](https://user-images.githubusercontent.com/12190482/218374305-219b2c51-783a-4753-9df8-450b45f92132.png)

[![Screenshot 2023-02-12 at 10 03 12 PM](https://user-images.githubusercontent.com/12190482/218374963-b1fcbda2-35f5-452a-b4c4-d847d1456a11.png)](https://user-images.githubusercontent.com/12190482/218374963-b1fcbda2-35f5-452a-b4c4-d847d1456a11.png)

* `t` function will now infer interpolation values, but it'll only work if the translation files (resources) are placed in a ts file and using `as const` _(like_ [_this_](https://github.com/i18next/i18next/blob/master/examples/typescript/i18n/en/ns1.ts)_)_ or an [interface in a d.ts file](https://github.com/locize/react-i18next-example-app-ts/blob/main/src/%40types/resources.d.ts) _(can be generated like_ [_this_](https://github.com/locize/react-i18next-example-app-ts/blob/751f704984c206076d08638442ae34b3507aa7ad/package.json#L35)_)_, JSON files don't support `as const` to convert objects to be type literals (yet).

**Breaking changes**

All breaking changes described below are minor ones:

1. Projects with the option `returnObjects` set as `true` by default will also have to set the same option in the `CustomTypeOptions` type. Otherwise, only complete keys will be allowed (`key1.key2.key3...`).

```
 // i18next.d.ts
 import 'i18next';
 declare module 'i18next' {
    interface CustomTypeOptions {
     returnObjects: true
      ...
```

2. Renaming `StringMap` to `$Dictionary`, and we'll no longer export it. `$Dictionary` is an internal helper, and there is no reason to expose it. If needed, you can create a copy and reuse it in your project.
3. `ns` property from `InterpolationOptions` type will be constrained to `Namespace` rather than `string` or `readonly string[]`.

Codemod for this Change:

```bash
npx codemod i18next/23/add-namespace-type-annotation
```

4. Renaming `KeysWithSeparator` type to `JoinKeys`, and it will no longer be exposed.

Codemod for this Change:

```bash
npx codemod i18next/23/replace-keys
```

5. Renaming `TFuncKey` type to `ParseKeys`.
6. Removing `NormalizeByTypeOptions` type.
7. Renaming `DefaultTFuncReturnWithObject` type to `DefaultTReturn`. It will accept `TOptions` as generic constraint and will no longer be exposed.

Codemod for this Change:

```bash
npx codemod i18next/23/remove-options
```

8. Removing `DefaultTFuncReturn` type in favor of `DefaultTReturn`.
9. Removing `NormalizeReturn` type.

</details>

{% hint style="info" %}
If you encounter any issues, please report them to the Codemod team with `npx codemod feedback`
{% endhint %}

#### Removed `setDebug` function in internal logger

Based on [this discussion](https://github.com/i18next/i18next/issues/1954#issuecomment-1537117407) we decided to remove the setDebug function.

#### Changed default value for `returnNull` option to `false`

To improve the usage for TypeScript users (in combination with React.js) we decided to set the `returnNull` value to `false` by default.\
More information can be found [here](https://github.com/i18next/i18next/issues/1884).

#### Dropped support for old browsers and Node.js < v12

To have smaller builds and faster loads, we now transpile only for modern browsers and runtimes.\
More information can be found [here](https://github.com/i18next/i18next/issues/1948).

#### Prefixed ordinal plural keys

To help translators, [ordinal plural](migration-guide.md#prefixed-ordinal-plural-keys) keys are now prefixed with `_ordinal`.

### v21.x.x to v22.0.0

Since this is a major rewrite for [TypeScript usage](../overview/typescript.md) we decided to create a major version.\
For JavaScript users v22.0.0 is equivalent to 21.10.0

### v20.x.x to v21.0.0

#### [json format v4](json-format.md#i-18-next-json-v4) - [pluralization](../translation-function/plurals.md)

One of the biggest breaking changes is regarding suffixing plurals.\
This change streamlines the suffix with the one used in the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/PluralRules).\
You may need to [polyfill](https://github.com/eemeli/intl-pluralrules) the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) API, in case it is not available it will fallback to the [i18next JSON format v3](json-format.md#i-18-next-json-v3) plural handling.\
To enforce old behaviour you can enable `compatibilityJSON = 'v3'` on i18next init call.

```javascript
import i18next from 'i18next';

i18next.init({
  compatibilityJSON: 'v3'
}, (err, t) => { /* resources are loaded */ });
```

There is also support for [ordinal numbers](../translation-function/plurals.md#ordinal-plurals) _(referring to the ordering or ranking of things, e.g. "1st", "2nd", "3rd" in English)_.\
Learn more about plurals: [https://www.i18next.com/translation-function/plurals](https://www.i18next.com/translation-function/plurals)

To convert your existing translations to the new v4 format, have a look at [i18next-v4-format-converter](https://github.com/i18next/i18next-v4-format-converter) or [this web tool](https://i18next.github.io/i18next-v4-format-converter-web/). _(It will only handle keys with the default pluralSeparator `_`)_

#### skipOnVariables = true

By default the `skipOnVariables` [option](../translation-function/interpolation.md#all-interpolation-options) now is set to true.\
To enforce old behaviour you can set `skipOnVariables = false` on i18next init call.

```javascript
import i18next from 'i18next';

i18next.init({
  interpolation: {
    skipOnVariables: false
  }
}, (err, t) => { /* resources are loaded */ });
```

#### natural language detection

i18next now automatically tries to detect natural language keys.\
This way there is no need to set `nsSeparator` or `keySeparator` [option](../overview/configuration-options.md#others) to `false`.\
&#xNAN;_&#x49;n case you want to skip this natural language detection, provide a `keySeparator` and/or a `nsSeparator` option._

#### removed deprecated

The old [deprecated whitelist options](https://github.com/i18next/i18next/issues/1466) and functions have been definitively removed.

* _rename option `whitelist` to `supportedLngs`_
* _rename option `nonExplicitWhitelist` to `nonExplicitSupportedLngs`_
* _rename function `languageUtils.isWhitelisted` to `languageUtils.isSupportedCode`_

#### new resolvedLanguage

There is a new [`i18next.resolvedLanguage`](../overview/api.md#resolvedlanguage) property, that represents the current resolved language. It can be used as primary used language, for example in a language switcher.

#### defaultNS

If passing the `ns` option, the `defaultNS` will, by default, be set to the first ns passed.

### v19.x.x to v20.0.0

There should not be any breaking change, but regarding of some misuse of i18next that pop up in last minor releases, we opted for a major version this time.\
The relevant change behind the scene for this major version was [ignoreJSONStructure](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2000).

### v18.x.x to v19.0.0

Typescript use `export default` for esm-first approach [1352](https://github.com/i18next/i18next/pull/1352). No API changes.

### v17.x.x to v18.0.0

* When calling `i18next.changeLanguage()` both `i18next.language` and `i18next.languages` will be set to the new language after calling `loadResources` -> means when accessing `t` function meanwhile you will get still the translations for the previous language instead of the fallback.
* **When is this breaking?** this does not break any current test - but if you depend on accessing i18next.language or i18next.dir during language change and expect the new language this will break your app.
* Reasoning: In react-i18next we get in a not ready state for loaded translations while we would prefer just waiting for the new language ready and trigger a rerender then - also a triggered rerender outside of the bound events would end in Suspense...
* How can I get the language i18next will be set to? `i18next.isLanguageChangingTo` is set to the language called

### v16.x.x to v17.0.0

* removes named exports in index.js to avoid issues in bundlers

### v15.x.x to v16.0.0

* Build process was updated - no API changes
* **note:** dist/es -> dist/esm, dist/commonjs -> dist/cjs (individual files -> one bundled file)

### v14.x.x to v15.0.0

* Build process was updated - no API changes

### v13.x.x to v14.0.0

* Breaking changes in typescript typings for details have a look at this [pull request](https://github.com/i18next/i18next/pull/1180).

### v12.x.x to v13.0.0

* typescript definitions now can directly be used from the i18next module - no longer needed to get them from DefinitelyTyped
* functions used to return a callback (eg. init, changeLanguage, loadNamespaces) now also return a Promise - while this enables easier handling using async await this also means eg. i18next.init does not return this anylonger and therefore you can't chain calls like `i18next.init().on()` anylonger.

### v11.x.x to v12.0.0

* plural form for hebrew was updated to latest [CLDR](http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html#he). Before it had one plural form. You will have to update your JSON files containing hebrew plurals. Or patch back the plural form to: [https://github.com/i18next/i18next/blob/master/src/PluralResolver.js#L43](https://github.com/i18next/i18next/blob/master/src/PluralResolver.js#L43) using the [addRule function](https://github.com/i18next/i18next/blob/master/src/PluralResolver.js#L90).\
  \
  Learn more about plurals: [https://www.i18next.com/translation-function/plurals](https://www.i18next.com/translation-function/plurals)

### v10.x.x to v11.0.0

* removes plugin of type cache. Can be replace by [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) example cache for localStorage [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend#getting-started)
* removes the support for multiload (multiRead) in backends - will just use read per language-namespace. You can enable multiRead support in backends again by using [i18next-multiload-backend-adapter](https://github.com/i18next/i18next-multiload-backend-adapter)

### v9.x.x to v10.0.0

brings pt, pt-PT, pt-BR plurals in line with, new pt reflects pt-BR and pt-PT gets a special case for plural handling [http://www.unicode.org/cldr/charts/26/supplemental/language\_plural\_rules.html](http://www.unicode.org/cldr/charts/26/supplemental/language_plural_rules.html)

| code   | locale               | rule                        |
| ------ | -------------------- | --------------------------- |
| pt-PT  | Portugal Portuguese  | plurals=2; plural=(n != 1); |
| pt\_BR | Brazilian Portuguese | plurals=2; plural=(n > 1);  |
| pt     | Portuguese           | plurals=2; plural=(n > 1);  |

### v8.x.x to v9.0.0

With v9 we removed the compatibility for the v1 API. So the `compatibilityAPI: 'v1'` flag won't do anything anymore.

You still can append this manually as we do for our old v1 tests - [learn more](https://github.com/i18next/i18next/blob/master/test/backward/v1.11.1.compat.js#L45-L52).

### v7.x.x to v8.0.0

The `nonExplicitWhitelist` flag was changed to be used in user detected language too, before it was restricted to defined fallback languages only.

```
i18next.init({
  fallbackLng: 'en',
  whitelist: ['de', 'en', 'zh'],
  nonExplicitWhitelist: true
});

// eg. `de-AT` will now pass the whitelist check
```

### v6.x.x to v7.0.0

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

### v5.x.x to v6.0.0

Return namespace in cimode with appendNamespaceToCIMode option (default now will only return key without namespace - independent of call to t function) [#863](https://github.com/i18next/i18next/issues/863)

This change might break your e2e tests if your depending on the cimode (the returned value can now be set to return always only key or ns+key)

### v4.x.x to v5.0.0

Nested keys should not be escaped [#854](https://github.com/i18next/i18next/issues/854)

i18next.cloneInstance() calls now init() (before it depended on having called that function with a callback) [#860](https://github.com/i18next/i18next/pull/860)

### v3.x.x to v4.0.0

There is only a small change for webpack2 builds which now targets es build with import/export in place to enable treeshaking (module entrypoint in package.json).

Nothing breaking for non webpack2 users.

### v2.x.x to v3.0.0

There is one breaking change regarding suffixing plurals in cases a language has multiple plural forms. Eg. arabic suffixes are now 0, 1, 2, 3, 4, 5 instead of 0, 1, 2, 3, 11, 100.

This change streamlines the suffix with the one used in gettext.

To enforce old behaviour you can enable `compatibilityJSON = 'v2'` on i18next init call.

```javascript
import i18next from 'i18next';

i18next.init({
  compatibilityJSON: 'v2'
}, (err, t) => { /* resources are loaded */ });
```

### v1.11.x to v2.0.0

While v2.0.0 is a full rewrite of the old codebase it should be possible to run in your app without completely rewrite your integration.

#### Getting started

The new version does not come with backend, cache and user language detection built in. i18next is more a core library that can be extended with modules on demand. This way it can be seamlessly used in browser, node.js or other javascript runtimes.

Modules are available on npm, via bower or on github to download.

#### browser

```javascript
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

**hint for jquery user:** use additional [jquery-i18next](https://github.com/i18next/jquery-i18next)

#### nodejs

```javascript
var i18next = require('i18next'),
  FilesystemBackend = require('i18next-node-fs-backend'),
  sprintf = require('i18next-sprintf-postprocessor');

i18next
  .use(FilesystemBackend)
  .use(sprintf)
  .init(options, callback);
```

#### nodejs + express

```javascript
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

#### Running v2.0.0 with compatibility flags

Version 2.0.0 has a compatibility layer built in which allows to run it like v1.11.x. Keep in mind this layer will be removed in future version.

```javascript
import i18next from 'i18next';

i18next.init({
  compatibilityAPI: 'v1',
  compatibilityJSON: 'v1',
  // ...old options from v1
}, (err, t) => { /* resources are loaded */ });
```

| option            | description                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| compatibilityAPI  | Will convert init and t options and expose old API functions. Will be removed with future update.                                                                                   |
| compatibilityJSON | Will allow to use JSON files in v1 format. Using old interpolation prefix, suffix and no need for singular suffix \[0] for singular in languages with more then just 1 plural form. |

#### Not supported any longer in v2.0.0

*   **support for older browsers**:

    Beginning with v2 we target only modern browsers (Chrome, Firefox, ... and IE >= 10).

    For IE9 you will need to add a es5 shim
*   **jquery**:

    use additional [jquery-i18next](https://github.com/i18next/jquery-i18next)
*   **synchronous loading**:

    `i18next.init({ getAsync: false });`

    is not supported any longer - as not encouraged by browsers.
*   **no conflict:**

    `i18n.noConflict();`

    was removed as i18next registers to window.i18next and no longer to window.i18n
*   **indefinite article:**

    `i18n.t('myKey', { indefinite_article: true })`

    was removed - as the solution was too limited - reconsidering adding a better solution in a future v2 release
