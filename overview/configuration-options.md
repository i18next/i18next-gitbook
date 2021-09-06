# Configuration Options

## Configuration options

`i18next.init(options, callback)`

All options for calling `init()` or `createInstance()`.

### Logging

| option | default | description |
| :--- | :--- | :--- |
| debug | false | logs info level to console output. Helps finding issues with loading not working. |

### Languages, namespaces, resources

| option | default | description |
| :--- | :--- | :--- |
| resources | undefined | resources to initialize with \(if not using a [backend plugin](plugins-and-utils.md#backends) or not using [`addResourceBundle`](api.md#addresourcebundle)\) |
| lng | undefined | language to use \(**overrides language detection**\). If set to `'cimode'` the output text will be the key. _Make sure you use the `'en-US'` format, instead of underscores or similar._ |
| fallbackLng | 'dev' | language to use if translations in user language are not available. _Setting it explicitly to `false` will not trigger to load the `fallbackLng` at all._ [See the Fallback docs](../principles/fallback.md#language-fallback). |
| supportedLngs | false | array of allowed languages |
| nonExplicitSupportedLngs | false | if true, will consider variants as supported when the main language is. E.g. `en-US` will be valid if `en` is in `supportedLngs` |
| load | 'all' | strategy to define which language codes to lookup. Example: given set language is `en-US`: - `'all'`  ⇒ `['en-US', 'en', 'dev']` - `'currentOnly'`  ⇒ `'en-US'` - `'languageOnly'`  ⇒ `'en'` |
| preload | false | array of languages to preload. Important on server-side to assert translations are loaded before rendering views. |
| lowerCaseLng | false | locale will be fully lowercased; e.g. `en-US` ⇒ `en-us` |
| cleanCode | false | main language will be lowercased; e.g. `EN`  ⇒ `en`, while leaving full locales like `en-US` |
| ns | 'translation' | string or array of namespaces to load |
| defaultNS | 'translation' | default namespace used if not passed to the [translation function](../translation-function/essentials.md) |
| fallbackNS | false | string or array of namespaces to lookup key if not found in given namespace. [See NS fallback docs](../principles/fallback.md#namespace-fallback). |
| partialBundledLanguages | false | allows some resources to be set on initialization while others can be loaded using a backend connector |

### Missing keys

<table>
  <thead>
    <tr>
      <th style="text-align:left">option</th>
      <th style="text-align:left">default</th>
      <th style="text-align:left">description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">saveMissing</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">calls save missing key function on backend if key not found</td>
    </tr>
    <tr>
      <td style="text-align:left">updateMissing</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">experimental: enable to update default values using the <code>saveMissing</code> (Works
        only if defaultValue is different from translated value. Only useful on
        initial development or when keeping code as source of truth not changing
        values outside of code. Only supported if backend supports it already)</td>
    </tr>
    <tr>
      <td style="text-align:left">saveMissingTo</td>
      <td style="text-align:left">&apos;fallback&apos;</td>
      <td style="text-align:left">&apos;current&apos; or &apos;all&apos;</td>
    </tr>
    <tr>
      <td style="text-align:left">saveMissingPlurals</td>
      <td style="text-align:left">true</td>
      <td style="text-align:left">will save all plural forms instead of only singular if t was called for
        plurals</td>
    </tr>
    <tr>
      <td style="text-align:left">missingKeyHandler</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">
        <p><code>function(lngs, ns, key, fallbackValue, updateMissing, options) { }</code> used
          for custom missing key handling (needs <code>saveMissing</code> set to true!)</p>
        <p><em>The <code>options</code> are an internal value container  similar to the </em>
          <a
          href="../translation-function/essentials.md#overview-options"><em><code>t() options</code></em>
            </a><em>.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">parseMissingKeyHandler</td>
      <td style="text-align:left">noop</td>
      <td style="text-align:left"><code>function(key) { // return value to display }</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">appendNamespaceToMissingKey</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">appends namespace to missing key</td>
    </tr>
    <tr>
      <td style="text-align:left">missingInterpolationHandler</td>
      <td style="text-align:left">noop</td>
      <td style="text-align:left"><code>function(text, value) { return &apos;stringWithAlternativeValueOrUndefined&apos; }</code> gets
        called in case a interpolation value is undefined. This method will not
        be called if the value is an empty string or null</td>
    </tr>
    <tr>
      <td style="text-align:left">missingKeyNoValueFallbackToKey</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">Used to not fallback to the key as default value, when using saveMissing
        functionality. * i.e. when using with i18next-http-backend this will result
        in having a key with an empty string value.</td>
    </tr>
  </tbody>
</table>

### Translation defaults

| option | default | description |
| :--- | :--- | :--- |
| simplifyPluralSuffix | true | will use 'plural' as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers |
| postProcess | false | string or array of postProcessors to apply per default |
| returnNull | true | allows null values as valid translation |
| returnEmptyString | true | allows empty string as valid translation |
| returnObjects | false | allows objects as valid translation result |
| returnedObjectHandler | noop | `function(key, value, options) {}` gets called if object was passed in as key but `returnObjects` was set to false |
| joinArrays | false | char that arrays will be joined by; e.g. `\n` |
| overloadTranslationOptionHandler | function\(args\) { return { defaultValue: args\[1\] }; }; | default: sets defaultValue |
| interpolation | [{...}](../translation-function/interpolation.md#all-interpolation-options) | see [interpolation](../translation-function/interpolation.md#all-interpolation-options) |
| skipInterpolation | false | Allow translate function to skip interpolation and return raw values instead |

### Plugin options

| option | default | description |
| :--- | :--- | :--- |
| detection | undefined | options for language detection - [check docs](plugins-and-utils.md#language-detector) |
| backend | undefined | options for backend - [check docs](plugins-and-utils.md#backends) |
| cache | undefined | options for a cache layer in backends - [check docs](plugins-and-utils.md#backends) |

### Others

| option | default | description |
| :--- | :--- | :--- |
| initImmediate | true | triggers resource loading in `init()` inside a `setTimeout` \(default async behaviour\). Set it to `false` if your backend loads resources synchronously - that way, calling `i18next.t()` after `init()` is possible without relying on the initialization callback.  **This option only works for sync \(blocking\) loading backend, like i18next-fs-backend and i18next-sync-fs-backend!** |
| keySeparator | `'.'` | char to separate keys. _If working with a flat JSON, it's recommended to set this to `false`._ |
| nsSeparator | `':'` | char to split namespace from key |
| pluralSeparator | `'_'` | char to split plural from key |
| contextSeparator | `'_'` | char to split context from key |
| appendNamespaceToCIMode | false | prefixes the namespace to the returned key when using `lng: 'cimode'` |
| ignoreJSONStructure | true | if a key is not found as nested key, it will try to lookup as flat key |

### initImmediate

Sample using `initImmediate` when using a backend plugin allowing sync \(blocking\) loads.

**This option only works for sync \(blocking\) loading backend, like** [**i18next-fs-backend**](https://github.com/i18next/i18next-fs-backend#if-set-i18next-initimmediate-option-to-false-it-will-load-the-files-synchronously)**!**

```javascript
import i18next from 'i18next';
import SyncBackend from 'i18next-fs-backend';

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

