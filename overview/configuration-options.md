# Configuration Options

`i18next.init(options, callback)`

All options for calling [`init()`](api.md#init) or [`createInstance()`](api.md#createinstance).

## Logging

| option | default | description |
| :--- | :--- | :--- |
| debug | false | logs info level to console output. Helps finding issues with loading not working. |

## Languages, namespaces, resources

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
      <td style="text-align:left">resources</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">resources to initialize with (if not using a <a href="plugins-and-utils.md#backends">backend plugin</a> or
        not using <a href="api.md#addresourcebundle"><code>addResourceBundle</code></a>)</td>
    </tr>
    <tr>
      <td style="text-align:left">lng</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">language to use (<b>overrides language detection</b>). If set to <code>&apos;cimode&apos;</code> the
        output text will be the key. <a href="../how-to/faq.md#how-should-the-language-codes-be-formatted"><em>Make sure you use the <code>&apos;en-US&apos;</code> format, instead of underscores or similar.</em></a>&lt;em&gt;&lt;/em&gt;</td>
    </tr>
    <tr>
      <td style="text-align:left">fallbackLng</td>
      <td style="text-align:left">&apos;dev&apos;</td>
      <td style="text-align:left">language to use if translations in user language are not available. <em>Setting it explicitly to <code>false</code> will not trigger to load the <code>fallbackLng</code> at all.</em> 
        <a
        href="../principles/fallback.md#language-fallback">See the Fallback docs</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left">supportedLngs</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">array of allowed languages</td>
    </tr>
    <tr>
      <td style="text-align:left">nonExplicitSupportedLngs</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">if true, will consider variants as supported when the main language is.
        E.g. <code>en-US</code> will be valid if <code>en</code> is in <code>supportedLngs</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">load</td>
      <td style="text-align:left">&apos;all&apos;</td>
      <td style="text-align:left">strategy to define which language codes to lookup. Example: given set
        language is <code>en-US</code>: - <code>&apos;all&apos;</code> &#x21D2; <code>[&apos;en-US&apos;, &apos;en&apos;, &apos;dev&apos;]</code> - <code>&apos;currentOnly&apos;</code> &#x21D2; <code>&apos;en-US&apos;</code> - <code>&apos;languageOnly&apos;</code> &#x21D2; <code>&apos;en&apos;</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">preload</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">array of languages to preload. Important on server-side to assert translations
        are loaded before rendering views.</td>
    </tr>
    <tr>
      <td style="text-align:left">lowerCaseLng</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">locale will be fully lowercased; e.g. <code>en-US</code> &#x21D2; <code>en-us</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">cleanCode</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">main language will be lowercased; e.g. <code>EN</code> &#x21D2; <code>en</code>,
        while leaving full locales like <code>en-US</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">ns</td>
      <td style="text-align:left">&apos;translation&apos;</td>
      <td style="text-align:left">string or array of namespaces to load</td>
    </tr>
    <tr>
      <td style="text-align:left">defaultNS</td>
      <td style="text-align:left">
        <p>&apos;translation&apos;</p>
        <p>&lt;em&gt;&lt;/em&gt;</p>
        <p><em>(if a <code>ns</code> option and no <code>defaultNS</code> option is defined, the first namespace is used as <code>defaultNS</code> option)</em>
        </p>
      </td>
      <td style="text-align:left">default namespace used if not passed to the <a href="../translation-function/essentials.md">translation function</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">fallbackNS</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">string or array of namespaces to lookup key if not found in given namespace.
        <a
        href="../principles/fallback.md#namespace-fallback">See NS fallback docs</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left">partialBundledLanguages</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">allows some resources to be set on initialization while others can be
        loaded using a backend connector</td>
    </tr>
  </tbody>
</table>

## Missing keys

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

## Translation defaults

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
      <td style="text-align:left">postProcess</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">string or array of postProcessors to apply per default</td>
    </tr>
    <tr>
      <td style="text-align:left">returnNull</td>
      <td style="text-align:left">true</td>
      <td style="text-align:left">allows null values as valid translation</td>
    </tr>
    <tr>
      <td style="text-align:left">returnEmptyString</td>
      <td style="text-align:left">true</td>
      <td style="text-align:left">allows empty string as valid translation</td>
    </tr>
    <tr>
      <td style="text-align:left">returnObjects</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">allows objects as valid translation result</td>
    </tr>
    <tr>
      <td style="text-align:left">returnedObjectHandler</td>
      <td style="text-align:left">noop</td>
      <td style="text-align:left"><code>function(key, value, options) {}</code> gets called if object was
        passed in as key but <code>returnObjects</code> was set to false</td>
    </tr>
    <tr>
      <td style="text-align:left">joinArrays</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">char that arrays will be joined by; e.g. <code>\n</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">overloadTranslationOptionHandler</td>
      <td style="text-align:left">function(args) { return { defaultValue: args[1] }; };</td>
      <td style="text-align:left">default: sets defaultValue</td>
    </tr>
    <tr>
      <td style="text-align:left">interpolation</td>
      <td style="text-align:left"><a href="../translation-function/interpolation.md#all-interpolation-options">{...}</a>
      </td>
      <td style="text-align:left">see <a href="../translation-function/interpolation.md#all-interpolation-options">interpolation</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">skipInterpolation</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">Allow translate function to skip interpolation and return raw values instead</td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p><del>simplifyPluralSuffix</del>
        </p>
        <p><em>(used in format &lt; format v4)</em>
        </p>
      </td>
      <td style="text-align:left"><del>true</del>
      </td>
      <td style="text-align:left"><del>will use &apos;plural&apos; as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers</del>
      </td>
    </tr>
  </tbody>
</table>

## Plugin options

| option | default | description |
| :--- | :--- | :--- |
| detection | undefined | options for language detection - [check docs](plugins-and-utils.md#language-detector) |
| backend | undefined | options for backend - [check docs](plugins-and-utils.md#backends) |
| cache | undefined | options for a cache layer in backends - [check docs](plugins-and-utils.md#backends) |

## Others

| option | default | description |
| :--- | :--- | :--- |
| initImmediate | true | triggers resource loading in `init()` inside a `setTimeout` \(default async behaviour\). Set it to `false` if your backend loads resources synchronously - that way, calling `i18next.t()` after `init()` is possible without relying on the initialization callback.  **This option only works for sync \(blocking\) loading backend, like i18next-fs-backend and i18next-sync-fs-backend!** |
| keySeparator | `'.'` | char to separate keys. _If working with a flat JSON, it's recommended to set this to `false`._ |
| nsSeparator | `':'` | char to split namespace from key |
| pluralSeparator | `'_'` | char to split plural from key |
| contextSeparator | `'_'` | char to split context from key |
| appendNamespaceToCIMode | false | prefixes the namespace to the returned key when using `lng: 'cimode'` |
| ignoreJSONStructure | true | if a key is not found as nested key, it will try to lookup as flat key |

## initImmediate

Sample using `initImmediate` when using a backend plugin allowing sync \(blocking\) loads.

**This option only works for sync \(blocking\) loading backend, like** [**i18next-fs-backend**](https://github.com/i18next/i18next-fs-backend#if-set-i18next-initimmediate-option-to-false-it-will-load-the-files-synchronously)**!**

```javascript
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

// not working
i18next
  .use(Backend)
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
  .use(Backend)
  .init({ initImmediate: false });

i18next.t('key'); // -> will return value

/*
execution order of function calls
- init
- loadResources (as called without timeout)
- t
*/
```

