---
description: "Breaking changes and migration steps for every major i18next release, from v19 to v27."
---

# Migration Guide

### v26.x.x to v27.0.0

**This is a major breaking release.** It changes defaults that most setups had to override, gives every instance its own logger and post-processors, refuses language codes that look like markup or paths, and removes options that were broken or had no effect. For most of the runtime changes, i18next 26.7 logs a warning in debug mode (`debug: true`), so running your app once on 26.7 with debug logging finds most of what concerns you. It does not warn for `returnEmptyString`, `addResources()`, `createInstance()`, `keySeparator: false` or the TypeScript changes; read those sections below.

#### Keep the v26 behavior

Where an option exists, one line brings the v26 behavior back:

```javascript
// the default escape of v26, '/' included
const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };

i18next.init({
  fallbackLng: 'dev', // better: your main language, e.g. 'en'
  returnEmptyString: true, // an empty translation is a translation again
  cleanCode: false, // keep codes without a region as they are ('EN' stays 'EN')
  interpolation: { escape: (str) => str.replace(/[&<>"'/]/g, (c) => entities[c]) }, // escape '/' again
  returnedObjectHandler: (key) => `key '${key}' returned an object instead of string.`, // a sentence for object hits
});
```

```typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    strictInterpolationChecks: false;
    returnEmptyString: true;
  }
}
```

The other changes have no switch; they are described below.

#### Changed defaults

* **`fallbackLng` defaults to `false`** instead of `['dev']`. `dev` was meant for the `saveMissing` workflow: missing keys went to a "developer language". Every app without a `fallbackLng` therefore requested `dev` from its backend (with i18next-http-backend `/locales/dev/translation.json`, which almost no project has). Now i18next loads only the requested language (and its language part, `de` for `de-CH`), and `saveMissing` sends missing keys for the current language. With `supportedLngs` and no `fallbackLng`, an unsupported language leaves `language` and `languages` unset, as an explicit `fallbackLng: false` already did in v26. Set `fallbackLng` to your main language; `fallbackLng: 'dev'` restores v26 exactly.
* **`returnEmptyString` defaults to `false`**: an empty translation falls back like a missing value (to the fallback language, the `defaultValue` or the key), as `null` already did. This makes the default fit i18next-cli, whose extractor writes `''` for keys that are not translated yet in the other languages: those keys now fall back instead of rendering blank. An explicit `''` default from code still counts: `t('key', '')` and `t('key', { defaultValue: '' })` return `''`. If an empty translation is meant to render nothing in a language (an empty particle or suffix), set `returnEmptyString: true`, in `init()` and in `CustomTypeOptions`. With Locize, this applies to projects that have "preserve empty strings" turned on in the CDN settings: their published files contain `""` on purpose, so set `returnEmptyString: true`.
* **Language codes without a region get their canonical casing**, as codes with a region already did (`'en-us'` became `'en-US'`): `'EN'` becomes `'en'`. Only the casing changes: aliases like `tl`, `iw` or `eng` stay as they are (`'TL'` becomes `'tl'`), and so do codes that are not BCP 47, like `en_US` or `my_custom`. i18next 26.7.0 and 26.7.1 warned that v27 turns `iw` into `he` or `tl` into `fil`; that was wrong and 26.7.2 corrects it. `iw`, `tl` and the like stay as they are. If your resources or translation files use upper case (`EN`), rename them to lower case, or set `cleanCode: false` to keep codes without a region exactly as they are. `cleanCode` is deprecated.

#### TypeScript

* **`strictInterpolationChecks` is `true` by default.** `t()` needs the options for a string with `{{variables}}`, so a variable cannot be left out of a call by accident (at runtime the raw `{{name}}` reaches the UI). It only concerns projects with typed resources. The three patterns that need a change:

```typescript
// 'greeting': 'Hello {{name}}'
t('greeting'); // error since v27
t('greeting', { name: user.name }); // ok

// a wrapper that passes a key on to t() without options
const label = (key: ParseKeys<'common'>) => t(key); // error once a string has variables
// type its key with ParseKeysWithoutVariables instead: only keys without variables
const plainLabel = (key: ParseKeysWithoutVariables<'common'>) => t(key); // ok

// variables filled in by interpolation.defaultVariables
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultVariables: { appName: string }; // appName becomes optional in t()
  }
}
```

A plural key needs `count` when its forms use it, also inside a union (`(key: 'plain' | 'item') => t(key)`), with `getFixedT` and when other options are passed (`t('item', { defaultValue })`). To keep the v26 types, set `strictInterpolationChecks: false`; with `parseInterpolation: 'icu'` or `'mf2'` that also gives back the v26 types (their messages require their arguments either way).

* **`returnEmptyString` is `false` in the types too**, so a key whose value is `''` is typed as the key.
* **`compatibilityJSON` is removed** from the options and `CustomTypeOptions`. It had no effect since v24; remove it.
* **`keySeparator: false`** in `CustomTypeOptions` offers only the flat keys (it produced `nestedfalsec`-style keys and split keys at the text `false`), and `keyPrefix` takes the parts of the flat keys before a `.` (`'nested'` for `'nested.c'`), since `getFixedT()` joins a key prefix with `.`. A key prefix combined with selectors is not typed for flat keys.
* **The internal helpers are no longer importable.** Every declaration in `typescript/t.d.ts` and `typescript/options.d.ts` counted as exported, internal helpers included. The 86 helpers whose name starts with `_` or `$` are hidden now; every other type of those files (for example `TOptionsBase`, `TFunctionSignature`, `ParseTReturn`, `DefaultTReturn`, `KeysBuilder`, `AppendKeyPrefix`) is exported on purpose. If you imported one of the hidden helpers, please [open an issue](https://github.com/i18next/i18next/issues): exporting it again breaks nothing. The hidden names: `$FirstNamespace`, `$IsResourcesDefined`, `$PluralBrand`, `$SelectorKeyBrand`, `$ValueIfResourcesDefined`, `_AllContextPrefixes`, `_ArgsFromEntries`, `_BuiltInFormatTypeMap`, `_ContextBases`, `_ContextPrefixes`, `_ContextPrefixesOf`, `_ContextSeparator`, `_CountIfPlural`, `_DefaultVariables`, `_DefinedContextKeys`, `_DefinedKeys`, `_DropConflictKeys`, `_EnableSelector`, `_FallbackNamespace`, `_FallbackParse`, `_HasContextVariant`, `_HasDefinedKey`, `_HasPlural`, `_IcuArg`, `_IcuArgsMap`, `_IcuBlock`, `_IcuCases`, `_IcuEntries`, `_IcuFormatType`, `_IcuSkipQuoted`, `_IcuStripQuotes`, `_IcuTrim`, `_IcuWhitespace`, `_IfOptionalDefaultOptions`, `_IfOptionalOptions`, `_InterpolationFormatSeparator`, `_InterpolationFormatTypeMap`, `_InterpolationMapFromEntries`, `_InterpolationPrefix`, `_InterpolationSuffix`, `_IsContextualKey`, `_IsLiteral`, `_KeyAndOptions`, `_KeySeparator`, `_KeysOf`, `_KeysWithoutVariables`, `_LegacyResources`, `_MergeNamespaces`, `_MergedResources`, `_Mf2ArgsMap`, `_Mf2Entries`, `_Mf2ExprEntries`, `_Mf2Expression`, `_Mf2FunctionType`, `_Mf2Locals`, `_Mf2Name`, `_Mf2Selectors`, `_Mf2Space`, `_Mf2Spaces`, `_Mf2StripEscapes`, `_Mf2Vars`, `_NonNeverKeys`, `_NsResourceStrict`, `_NsSeparator`, `_ParseInterpolation`, `_ParsesMessageFormat`, `_PerPropMerge`, `_PluralSeparator`, `_PrimaryParse`, `_RequiresMessageOptions`, `_ResolveEntryType`, `_Resources`, `_ReturnEmptyString`, `_ReturnNull`, `_ReturnObjects`, `_SelectorArrayOptionsArg`, `_SelectorOptionsArg`, `_SelectorsReturn`, `_StrictInterpolationChecks`, `_StrictKeyChecks`, `_StripFormatOptions`, `_UnescapePrefix`, `_UnescapeSuffix`, `_UnionToIntersection`, `_ValueOf`, `_WithDefaultVariables`. `_CompatibilityJSON` was removed together with `compatibilityJSON`.
* **Plugin option types belong to the plugins.** `locizeLastUsed` is declared by locize-lastused 5.1.0 and later. `ReactOptions` stays importable from `'i18next'`, but react-i18next fills it in (17.1.13 and later, and 18): the `react` options are checked when react-i18next is part of the program.

#### Logger and post-processors per instance

In v26 the logger and the post-processors were shared by all instances: the `init()` of one instance rewired the logging of all others, and a post-processor `use()`d on one instance worked in every instance. Now they belong to the instance:

* An instance from `createInstance()` does not see what the default `i18next` instance, or any other instance, registered. Call `use()` on each instance.

Before (v26), this worked because the default instance registered sprintf for everybody:

```javascript
import i18next from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';

i18next.use(sprintf);
const instance = i18next.createInstance();
await instance.init({ postProcess: 'sprintf' /* ... */ });
```

After (v27):

```javascript
import i18next from 'i18next';
import sprintf from 'i18next-sprintf-postprocessor';

const instance = i18next.createInstance();
await instance.use(sprintf).init({ postProcess: 'sprintf' /* ... */ });
```

* A clone (`cloneInstance()`, one per request with i18next-http-middleware) keeps the logger and the post-processors of its parent, also those its parent registers later. What a clone registers itself stays its own.
* A plugin that calls `use()` from its own `init()` (like the Locize InContext editor) registers right away, as before.
* `i18next.services.logger` is the instance's logger, with `forward()` as before.
* In debug mode, a `postProcess` name that is not registered on the instance logs a warning.

#### Language codes from outside

A language code from `lng`, `changeLanguage()`, a language detector or `loadLanguages()` that does not have the shape of `isSafeLanguageCode()` is refused, unless it is configured. The shape: letters, digits, `-`, `_`, `@` and `.` (no `..`), at most 128 characters, not a prototype key. Configured means listed in `supportedLngs`, in a `fallbackLng` that is not a function or in `preload`, or a language in `resources`, as given to `init()`; a `fallbackLng` function and languages added later (`loadLanguages()`, `addResourceBundle()`) do not count. Without `supportedLngs`, a detector that returned `"><img src=x onerror=alert(1)>` made that string `i18next.language`, which apps put into `<html lang>`, and backends were asked to load it.

`changeLanguage()` continues as with an unsupported code: with the detector's next code, else the fallback language, else none (with `fallbackLng: false`, a code refused at `init()` leaves `language` unset). `loadLanguages()` skips the code. BCP 47 (`en-US`, `zh-Hant-TW`, `en-x-pirate`), POSIX (`en_US.UTF-8@euro`, `sr@latin`) and other codes with `_` pass. To use a code with other characters, for example `b+sr+Latn`, list it in `supportedLngs`. In debug mode a refused code logs a warning. With `supportedLngs` nothing changes for you: the input is matched as before (`'de-DE;q=0.9'` still gives `'de'`), and only an unsafe match is refused, which only `nonExplicitSupportedLngs` can return (`'de-<x>'` for a supported `'de'`).

#### Output changes

* **`/` is no longer escaped.** The default escape turned `$10/month` into `$10&#x2F;month` and dates in react-i18next's `Trans` into `17&#x2F;12&#x2F;2025`. `&`, `<`, `>`, `"` and `'` are still escaped, which covers HTML text and quoted attributes; a `/` cannot end either. Update snapshot tests that contain `&#x2F;`. A custom `interpolation.escape` is not affected; one that escapes `/` too keeps the v26 output (see "Keep the v26 behavior" above).
* **An object or array without `returnObjects` is handled like a missing key**: `t()` returns the default value if one is passed, else the key, with `appendNamespaceToMissingKey`, `parseMissingKeyHandler` and the post-processors applied as for a missing key. It used to return the sentence `key 'obj (en)' returned an object instead of string.`, which ended up in the UI. The key is not saved as missing, since it exists. The debug warning stays; `returnedObjectHandler` still decides what is returned when it is set, so it can bring a sentence back.
* **`addResources()` keeps every value.** It added only strings and arrays and silently dropped numbers, booleans and nested objects.
* `dir()` without a language returns `'ltr'` (since 26.7.0).

#### `createInstance(options)`

`createInstance(options)` merges the defaults right away, without initializing the instance. Before `init()`, `instance.options` has the defaults (`options.interpolation`, `overloadTranslationOptionHandler`, ...), `getFixedT()` no longer throws, and with `debug: true` the warnings before `init()` are shown; `t()` returns `''` until `init()`. A `keySeparator` or `nsSeparator` passed to `createInstance()` now counts as set by you, as if passed to `init()`. `loadNamespaces()` before `init()` does nothing and calls back. You still call `init()` as before; with a callback, `createInstance(options, callback)` initializes right away, as in v26.

#### `keySeparator: false`

With `keySeparator: false` keys are flat: a lookup no longer splits a key at the text `false` (`t('nestedfalsec')` returned the value of `nested.c`), and a selector path is joined with `.` like a key prefix. Selectors work on the flat keys: `$ => $['a.b']` and `$ => $.a.b` look up the flat key `'a.b'`, and `$ => $.nested.c` no longer resolves `nested`, then `c`.

#### Removed

| Removed | Use instead |
| --- | --- |
| `getResource('en.translation.key')`, `addResource('en.translation.key', value)`, `addResourceBundle('en.translation', resources)` | `getResource('en', 'translation', 'key')`, `addResource('en', 'translation', 'key', value)`, `addResourceBundle('en', 'translation', resources)`. The dotted form throws a `TypeError` in `addResource()`, `addResources()` and `addResourceBundle()`. A language code with a `.` (`de_DE.UTF-8`) is now a language like any other. |
| `interpolation.prefixEscaped`, `suffixEscaped`, `nestingPrefixEscaped`, `nestingSuffixEscaped` (inserted into the RegExp unescaped) | the literal delimiters as `prefix`, `suffix`, `nestingPrefix`, `nestingSuffix` |
| `compatibilityJSON` (types) | nothing, remove it |
| `locizeLastUsed` and the body of `ReactOptions` (types) | locize-lastused 5.1.0, react-i18next 17.1.13 or 18 |
| the root `index.js` (a CommonJS shim the `exports` map made unreachable) | `require('i18next')` |

#### For plugin authors

* Declare the calling convention of a backend or an async language detector with `callbackApi` (since 26.7.0, see [Creating own Plugins](creating-own-plugins.md#backend)). Plugins without it still work in v27: i18next guesses from the number of parameters, which default and rest parameters change, and logs a deprecation warning in debug mode. The guessing is planned to go in a later major.
* Reload through `services.utils.reloadResources()` instead of calling `backendConnector.read()` and `loaded()` yourself (since 26.7.0).
* SSR integrations put server-rendered resources into the store with [`hydrate()`](../overview/api.md#hydrate) (since 26.7.0). Writing `isInitialized`, `initializedStoreOnce` and `initializedLanguageOnce` from outside still works in v27, so react-i18next 17's `useSSR` keeps working, but it is deprecated.
* Use `isSafeLanguageCode()` to check a language code from a request, a URL or storage with the same rule as core.
* `services.backendConnector.backend`, `services.languageUtils`, `services.resourceStore`, `services.interpolator` and the `cloneInstance()` semantics are unchanged.

#### Support

* Node.js 22 or later (`engines`).
* The build targets ES2020 (Chrome and Edge 80, Firefox 80, Safari 14, Opera 67, Samsung Internet 13). It used browserslist `defaults`, which changed with every update of the browser data; the output is the same as 26.7's.
* TypeScript `^5 || ^6 || ^7`, unchanged.

#### Changes from 26.x patches, in one place

* 26.4.7: a clone no longer inherits `preload`.
* 26.5.5: with `skipOnVariables` (the default), a `{{placeholder}}` inside a value inserted with `{{- var}}` stays literal.
* 26.5.10: the best match no longer picks a supported code that only starts with the same letters.
* 26.5.11 and 26.5.12: a nested `0`, `false` or `''` wins over a flat dotted key; a nested `null` falls back to it.

#### Selector API

Both APIs are supported, in the types too: string keys stay first-class, and the selector API (`enableSelector`) stays opt-in. The old note that v26 would turn on selectors by default and v27 would deprecate string-key types is withdrawn. Selectors help with very large namespaces and go-to-definition; see [TypeScript](../overview/typescript.md).

#### Companion releases

* [react-i18next](https://react.i18next.com/latest/migrating-v17-to-v18): on i18next 27, use react-i18next 17.1.13 or later, or 18; 17.x keeps working.
* [i18next-cli](https://github.com/i18next/i18next-cli): update to the release published with i18next 27.
* [next-i18next](https://github.com/i18next/next-i18next): its peers already allow both majors.

### Preparing for v27 (v26.7.0)

v26.7.0 is the last 26.x minor. With `debug: true` it logs a warning wherever a setup relies on something v27 changes, and most v27 defaults can be tried now with existing options:

```javascript
i18next.init({
  debug: true, // prints the warnings
  fallbackLng: 'en', // v27: fallbackLng defaults to false, set your source language (no implicit 'dev')
  returnEmptyString: false, // v27 default: an empty string falls back like a missing key
  cleanCode: true, // close to v27, which canonicalizes codes without a region ('EN' becomes 'en')
});
```

```typescript
declare module 'i18next' {
  interface CustomTypeOptions {
    strictInterpolationChecks: true; // v27 default
    returnEmptyString: false; // v27 default
  }
}
```

With `strictInterpolationChecks`, type the key of a wrapper around `t()` with `ParseKeysWithoutVariables` and declare variables from `interpolation.defaultVariables` with the `defaultVariables` type option (see [TypeScript](../overview/typescript.md#custom-type-options)). Plugin authors: declare `callbackApi` on backends and async detectors (see [Creating own Plugins](creating-own-plugins.md#backend)).

### v25.x.x to v26.0.0

**This is a major breaking release:**

* **Removed legacy `interpolation.format` function** — the old monolithic format function (`interpolation: { format: (value, format, lng) => ... }`) is no longer supported. The built-in Formatter is now always used. For custom formatting, use `i18next.services.formatter.add()` or `.addCached()`, or provide a custom Formatter module via `.use()`. See the [formatting docs](../translation-function/formatting.md).
* **Removed deprecated `initImmediate` option** — use `initAsync` instead (renamed in v24).
* **Removed console support notice** — the `showSupportNotice` option and all related internal suppression logic (`globalThis.__i18next_supportNoticeShown`, `I18NEXT_NO_SUPPORT_NOTICE` env var) have been removed. [Read this](https://www.locize.com/blog/i18next-support-notice?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=misc_migration_guide) to know more about it.
* **`i18next.format` now always uses the Formatter** — `i18next.format` still works, but it is backed by the built-in [Formatter](../translation-function/formatting.md) (or a custom Formatter module). It no longer accepts a user-supplied function via `interpolation.format`.

#### Migration steps

1. If you were using `interpolation: { format: function(value, format, lng) { ... } }`, migrate your custom logic to the Formatter API:

```javascript
// before (v25 and earlier)
i18next.init({
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    }
  }
});

// after (v26)
i18next.init({ /* ... */ });
i18next.services.formatter.add('uppercase', (value, lng, options) => {
  return value.toUpperCase();
});
```

2. Replace any usage of `initImmediate` with `initAsync`.
3. Remove any usage of `showSupportNotice` from your init options.

### v25.3.x to v25.4.0

* add new selector API to improve TypeScript IDE performance [2322](https://github.com/i18next/i18next/pull/2322)
  * To enable it, set `enableSelector: true` in your configuration options
  * With `enableSelector: "optimize"`, i18next can now handle translation dictionaries of any size, without affecting IDE performance or build times
  * To assist with the migration, we've published the following packages:
    * [@i18next-selector/codemod](https://github.com/ahrjarrett/i18next-selector/tree/main/packages/codemod)
    * [@i18next-selector/vite-plugin](https://github.com/ahrjarrett/i18next-selector/tree/main/packages/vite-plugin)

### v24.x.x to v25.0.0

**This is a potentially breaking release:**

* fix multiple `changeLanguage` call that may have result in wrong order in previous versions [1605](https://github.com/i18next/i18next/issues/1605) [2298](https://github.com/i18next/i18next/pull/2298)
* adapt `changeLanguage` to always (string or array) use `getBestMatchFromCodes` [2299](https://github.com/i18next/i18next/issues/2299)
* `getBestMatchFromCodes` now tries to fallback to language code with same script [2299](https://github.com/i18next/i18next/issues/2299)

### v23.x.x to v24.0.0

* remove support for older environments
* remove old i18next [JSON formats](json-format.md)
  * to convert your existing [v3](json-format.md#i18next-json-v3) translations to the [v4](json-format.md#i18next-json-v4) format, have a look at [i18next-v4-format-converter](https://github.com/i18next/i18next-v4-format-converter) or this [web tool](https://i18next.github.io/i18next-v4-format-converter-web/).
* remove support for compatibility to the very first [v1 API](https://www.i18next.com/misc/the-history-of-i18next) ([old docs](https://i18next.github.io/i18next/))
* [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) is mandatory now and will not fallback anymore, use a polyfill ([`Intl.PluralRules`](https://github.com/eemeli/intl-pluralrules) and [`Intl.getCanonicalLocales`](https://formatjs.github.io/docs/polyfills/intl-getcanonicallocales/)) if your environment does not support it.
  * for those who really need the old behaviour, needs to create a compatibility layer similar to [this](https://github.com/i18next/i18next/blob/6b3b06057a3c5aee8e4900ef0731a3cf9254a4fa/test/compatibility/v4/v4Compatibility.js).
* renamed `initImmediate` to `initAsync`
* fallback to `dev` language if plural rule not found
* Dropped support for Node.js < v14

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
To enforce old behaviour you can enable `compatibilityJSON = 'v3'` on i18next init call. _(Note: this escape hatch existed up to v23; since v24 the old JSON formats and the fallback are removed, the Intl API is mandatory, and the polyfill is the only fix.)_

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
