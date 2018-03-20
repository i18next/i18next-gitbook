<!-- toc -->
# Configuration options

`i18next.init(options, callback)`

All options for calling init or createInstance.

## logging

option            | default             | description
----------------- | --------------------| -----------------
debug             | false               | logs info level to console output. Helps finding issues with loading not working.

## languages, namespaces, resources

option            | default             | description
----------------- | --------------------| -----------------
resources         | undefined           | resources to initialize with (if not using loading or not appending using [addResourceBundle](/api.md#addresourcebundle))
lng               | undefined           | language to use (overrides language detection)
fallbackLng       | 'dev'               | language to use if translations in user language are not available. [Learn more](/principles/fallback.md).
whitelist         | false               | array of allowed languages
nonExplicitWhitelist | false            | if true will pass eg. `en-US` if finding `en` in whitelist
load              | 'all'               | language codes to lookup, given set language is 'en-US': `'all' --> ['en-US', 'en', 'dev']`, `'currentOnly' --> 'en-US'`, `'languageOnly' --> 'en'`
preload           | false               | array of languages to preload. Important on serverside to assert translations are loaded before rendering views.
lowerCaseLng      | false               | language will be lowercased eg. `en-US` --> `en-us`
ns                | 'translation'       | string or array of namespaces to load
defaultNS         | 'translation'       | default namespace used if not passed to [translation function](/essentials.md)
fallbackNS        | false               | string or array of namespaces to lookup key if not found in given namespace. [Learn more](/principles/fallback.md#namespace-fallback).

## missing keys

option            | default             | description
----------------- | --------------------| -----------------
saveMissing       | false               | calls save missing key function on backend if key not found
updateMissing     | false               | experimental: enable to update default values using the saveMissing (Works only if defaultValue different from translated value. Only useful on initial development or when keeping code as source of truth not changing values outside of code. Only supported if backend supports it already)
saveMissingTo     | 'fallback'          | 'current' or 'all'
saveMissingPlurals | true | will save all plural forms instead of only singular if t was called for plurals
missingKeyHandler | false               | `function(lng, ns, key, fallbackValue) { }` used for custom  missing key handling (needs saveMissing set to true!)
parseMissingKeyHandler | noop           | function(key) { // return value to display }
appendNamespaceToMissingKey | false     | appends namespace to missing key
missingInterpolationHandler | noop | function(text, value) { return 'stringWithAlternativeValueOrUndefinded' };` gets called in case a interpolation value is missed.

## translation defaults

option            | default             | description
----------------- | --------------------| -----------------
simplifyPluralSuffix | true             | will use 'plural' as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers
postProcess       | false               | string or array of postProcessors to apply per default
returnNull        | true                | allows null values as valid translation
returnEmptyString | true                | allows empty string as valid translation
returnObjects     | false               | allows objects as valid translation result
returnedObjectHandler | noop            | `function(key, value, options) {}` gets called if object was passed in as key but returnObjects was set to false
joinArrays        | false               | char, eg. '\n' that arrays will be joined by
overloadTranslationOptionHandler | function(args) { return { defaultValue: args[1] }; }; | default: sets defaultValue
interpolation     | {...}               | see interpolation 

## plugin options

option            | default             | description
----------------- | --------------------| -----------------
detection         | undefined           | options for language detection - check documentation of plugin
backend           | undefined           | options for backend - check documentation of plugin
cache             | undefined           | options for cache layer - check documentation of plugin


## misc


option            | default             | description
----------------- | --------------------| -----------------
initImmediate     | true                | triggers resource loading in init function inside a setTimeout (default async behaviour). Set it to false if your backend loads resources sync - that way calling i18next.t after init is possible without relaying on the init callback.
keySeparator      | '.'                 | char to separate keys
nsSeparator       | ':'                 | char to split namespace from key
pluralSeparator   | '\_'                 | char to split plural from key
contextSeparator  | '\_'                 | char to split context from key
appendNamespaceToCIMode | false 		| prefixes the namespace to the returned key when using `cimode`

### initImmediate

Sample using initImmediate when using a backend plugin allowing sync (blocking) loads.

```js
import i18next from 'i18next';
import SyncBackend from 'i18next-sync-fs-backend';

// not working
i18next
  .use(SyncBackend)
  .init();
  
i18next.t('key'); // -> will not return value as init was run async

/*
execution order of function calls
- init
- t
- loadResources (as called inside timeout)
*/

// working
i18next
  .use(SyncBackend)
  .init({ initImmediate: false });
  
i18next.t('key'); // -> will return value

/*
execution order of function calls
- init
- loadResources (as called without timeout)
- t
*/

```



