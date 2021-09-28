# Plugins and Utils

![](../.gitbook/assets/ecosys.jpg)

## i18n formats

While the i18next format \(JSON based\) is the preferred solution and widely supported in translation management tools like [locize.com](https://locize.com), you might prefer another exciting format, like:

| **name** | **format** | **description** |
| :--- | :--- | :--- |
| [i18next-fluent](https://github.com/i18next/i18next-fluent) | fluent | i18nFormat plugin to use mozilla [fluent format](https://projectfluent.org/) with i18next |
| [i18next-icu](https://github.com/i18next/i18next-icu) | ICU | i18nFormat plugin to use ICU format with i18next based on [yahoo/intl-messageformat](https://github.com/formatjs/formatjs/tree/master/packages/intl-messageformat) |
| [i18next-polyglot](https://github.com/i18next/i18next-polyglot) | polyglot | i18nFormat plugin to use [airbnb/polyglot.js](https://github.com/airbnb/polyglot.js) format with i18next |

## extraction tools

| **name** | **description** |
| :--- | :--- |
| [i18next-scanner](http://i18next.github.io/i18next-scanner) | Scan your code, extract translation keys/values, and merge them into i18n resource files. |
| [i18next-parser](https://github.com/i18next/i18next-parser) | A simple command line and gulp plugin that lets you parse your code and extract the translations keys in it. |
| [babel-plugin-i18next-extract](https://github.com/gilbsgilbs/babel-plugin-i18next-extract) | A babel plugin that can extract keys in JSONv3 format. |
| [translation-check](https://github.com/locize/translation-check) | Nicely shows an overview of your translations in a UI. Check which keys are not yet translated. |

## utils

| **util** | **type** | **description** |
| :--- | :--- | :--- |
| [i18next-gettext-converter](https://github.com/i18next/i18next-gettext-converter) | converter | Converts gettext .mo or .po to 18next json format and vice versa. |
| [csv2i18next](https://github.com/tmorozov/csv2i18next) | converter | Convert CSV files to JSON & YAML for i18next.js |
| [i18next-json-csv-converter](https://github.com/andraaspar/i18next-json-csv-converter) | converter | Convert between CSV files and JSON format for i18next |
| [resx2i18next](https://github.com/rolandpd/resx2i18next) | converter | Convert ResX-files to json resources compatible with i18next |
| [i18nextResourceGenerator](https://github.com/DREEBIT/i18nextResourceGenerator) | extractor | Intellij IDEA Plugin for i18next resource generation |
| [aurelia-i18next-parser](https://github.com/gooy/aurelia-i18next-parser) | extractor | Extracts i18n keys and values from source files. |
| [grunt-i18next](https://github.com/i18next/grunt-i18next) | bundler | bundle language resource files for i18next |
| [i18next-gettext-loader](https://github.com/openculinary/i18next-gettext-loader) | bundler | Convert gettext PO files into i18next JSON format during webpack builds |
| [i18next-po-loader](https://github.com/queicherius/i18next-po-loader) | bundler | Load gettext PO files as i18next format directly in webpack |
| [i18next-loader](https://github.com/kamilglod/i18next-loader) | bundler | webpack loader that can translate your code and generate bundle per each language |
| [@alienfast/i18next-loader](https://github.com/alienfast/i18next-loader) | bundler | This webpack loader generates the resources structure necessary for i18next. The structure is webpacked with the client bundle at build time, thus avoiding loading any language resources via extra HTTP requests. |
| [webpack i18next-resource-store-loader](https://github.com/atroo/i18next-resource-store-loader) | bundler | This loader generates the resStore config needed for i18next to avoid loading language resources via extra HTTP requests. It generates this config given a directory. |
| [ya-i18next-webpack-plugin](https://github.com/Perlmint/ya-i18next-webpack-plugin) | bundler | Yet another i18next webpack plugin. This plugin collects keys from webpack parsing phase, saves missing translations into specified path, copies translation files. |
| [rollup-plugin-i18next-conv](https://github.com/perrin4869/rollup-plugin-i18next-conv) | bundler/converter | Import .po files with rollup |
| [i18next-static-analysis](https://github.com/Cellule/i18next-static-analysis) | util | analyse statically your code to find calls to i18next and validates them for all your supported languages |
| [i18next-json-sync](https://github.com/jwbay/i18next-json-sync) | util | Keep i18next JSON resource files in sync with source language file |
| [i18next-locales-sync](https://github.com/felixmosh/i18next-locales-sync) | util | Syncs i18next locale resource files against a primary language. Supports namespaces, plural forms and key sorting. |
| [eslint-plugin-i18next](https://github.com/edvardchen/eslint-plugin-i18next) | util | Make sure that all text shown are translated |
| [i18next support for JetBrains IDEs](https://plugins.jetbrains.com/plugin/12981-i18n-support/) | IDE integration | Navigation, code completion, highlighting |
| [i18next-hmr](https://github.com/felixmosh/i18next-hmr) | bundler / DX | HMR webpack plugin that allows to reload translation resources on client & server |
| [translation-check](https://github.com/locize/translation-check) | util / DX | Nicely shows an overview of your translations in a UI. Check which keys are not yet translated. |
| [i18next-v4-format-converter](https://github.com/i18next/i18next-v4-format-converter) | converter | Convert old i18next translation resources to the new [i18next v4 json format](../misc/json-format.md#i-18-next-json-v4). Via CLI or programmatically. |
| [i18next-v4-format-converter-web](https://i18next.github.io/i18next-v4-format-converter-web/) | online-converter | Convert old i18next translation resources to the new [i18next v4 json format](../misc/json-format.md#i-18-next-json-v4) directly in your browser. |

## services

Services that are known to fully support the i18next format \(plural handling, ...\) and sponsoring or contributing to the development of i18next.

| **name** | **description** |
| :--- | :--- |
| [locize](http://locize.com) | localization as a service. Solves your localization process using i18next. |

## backend extenders

| **backend** | **description** |
| :--- | :--- |
| [chained backend](https://github.com/i18next/i18next-chained-backend) | combine multiple of the existing backends for fallback and caching scenarios |
| [i18next-multiload-backend-adapter](https://github.com/i18next/i18next-multiload-backend-adapter) | enable another backend's multiload behaviour of loading multiple lng-ns combinations with one request. This behaviour was removed from i18next &gt;=v11.0.0 and could be enabled again by using this adapter |

## backends

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>backend</b>
      </th>
      <th style="text-align:left"><b>description</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-localstorage-backend">localstorage backend</a>
      </td>
      <td style="text-align:left">This is a i18next cache layer to be used in the browser. It will load
        and cache resources from localStorage and can be used in combination with
        the <a href="https://github.com/i18next/i18next-chained-backend">chained backend</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/timbrandin/i18next-async-storage-backend">async storage backend</a>
      </td>
      <td style="text-align:left">This is a i18next cache layer to be used in react native. It will load
        and cache resources from AsyncStorage and can be used in combination with
        the <a href="https://github.com/i18next/i18next-chained-backend">chained backend</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-fs-backend">filesystem</a>
      </td>
      <td style="text-align:left">
        <p>backend layer for i18next used in Node.js and for Deno to load translations
          from the filesystem.</p>
        <p>It can also be used as cache layer in combination with the <a href="https://github.com/i18next/i18next-chained-backend">chained backend</a>,
          <a
          href="https://github.com/i18next/i18next-fs-backend/blob/master/example/caching/app.js">i.e. a chained backend together with the http backend</a>or with the
            <a
            href="https://github.com/locize/i18next-locize-backend">locize backend</a>.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-http-backend">http backend</a>
      </td>
      <td style="text-align:left">backend layer for i18next using in node.js, in the browser and for deno
        (will use xhr or fetch)</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-xhr-backend">xhr backend</a>
      </td>
      <td style="text-align:left">backend layer for i18next using browsers xhr <b>deprecated</b>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/perrin4869/i18next-fetch-backend">fetch backend</a>
      </td>
      <td style="text-align:left">backend layer for i18next using browsers fetch</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-fluent-backend">fluent backend</a>
      </td>
      <td style="text-align:left">backend to load <a href="https://projectfluent.org/">fluent syntax</a> .ftl
        files via xhr</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/kingatlas/i18next-keys-ondemand">keys ondemand</a>
      </td>
      <td style="text-align:left">fetch missing keys on demand</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/laodemalfatih/i18next-node-mongo-backend">mongodb backend</a>
      </td>
      <td style="text-align:left">backend layer for i18next used in Node.js &amp; Deno to load translations
        from the MongoDB.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/gregfenton/i18next-node-firestore-backend">Firestore backend</a>
      </td>
      <td style="text-align:left">backend layer for i18next used in Node.js &amp; Deno to load translations
        from Google&apos;s Firestore DB.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-fs-backend">nodejs filesystem</a>
      </td>
      <td style="text-align:left">node.js backend layer for i18next using fs module to load resources from
        filesystem</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/reZach/i18next-electron-fs-backend">nodejs filesystem (electron)</a>
      </td>
      <td style="text-align:left">node.js backend for i18next using fs module to load resources securely
        in an electron app from filesystem</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/i18next/i18next-node-remote-backend">nodejs remote</a>
      </td>
      <td style="text-align:left">node.js backend layer for i18next using request module to load resources
        from another server</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/kvaillant/i18next.couchbase">nodejs couchbase</a>
      </td>
      <td style="text-align:left">i18next node.js backend layer for i18next using couchbase</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://bitbucket.org/tagoh/i18next-node-zanata-backend">Zanata nodejs backend</a>
      </td>
      <td style="text-align:left">i18next node.js backend layer for <a href="http://zanata.org">Zanata</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/inteligator/i18next-firebase-backend">i18next-firebase-backend</a>
      </td>
      <td style="text-align:left">i18next Backend Using Firebase</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/nekuz0r/i18next-smart-bucket-backend">i18next-smart-bucket-backend</a>
      </td>
      <td style="text-align:left">i18next backend for smart-bucket</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/locize/i18next-locize-backend">locize backend</a>
      </td>
      <td style="text-align:left">backend layer for <a href="http://locize.com">locize.com - localization as a service</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/timbrandin/i18next-service-backend">service backend</a>
      </td>
      <td style="text-align:left">backend layer for external services such as <a href="https://spacetranslate.com">spacetranslate.com - Simple Translation Service at Scale</a> and
        <a
        href="http://locize.com">locize.com - localization as a service</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/locize/i18next-node-locize-backend">locize nodejs backend</a>
      </td>
      <td style="text-align:left">backend layer for <a href="http://locize.com">locize.com - localization as a service</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://github.com/timbrandin/i18next-node-service-backend">service node backend</a>
      </td>
      <td style="text-align:left">backend layer for external services such as <a href="https://spacetranslate.com">spacetranslate.com - Simple Translation Service at Scale</a> and
        <a
        href="http://locize.com">locize.com - localization as a service</a>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><a href="https://gist.github.com/SimeonC/6a738467c691eef7f21ebf96918cd95f">webpack import backend</a>
      </td>
      <td style="text-align:left">Use webpack code splitting to load files as a javascript bundle</td>
    </tr>
  </tbody>
</table>

## language detector

| **language** **detector** | **description** |
| :--- | :--- |
| [universal \(browser + nodejs\)](https://github.com/UnlyEd/universal-language-detector) | Language detector that works universally \(browser + server\) - Meant to be used with a universal framework, such as Next.js |
| [browser](https://github.com/i18next/i18next-browser-languageDetector) | language detector used in browser environment for i18next |
| [http](https://github.com/i18next/i18next-http-middleware) | language detector for "any" http backend, also for Deno |
| [nodejs express](https://github.com/i18next/i18next-express-middleware) | language detector for express.js \(nodejs\). |
| [nodejs koa](https://github.com/lxzxl/koa-i18next-detector) | A i18next language detecting plugin for Koa framework. |
| [react native](https://github.com/DylanVann/i18next-react-native-language-detector) | language detector for React Native. |
| [react native Async Storage](https://github.com/0xClpz/i18next-react-native-async-storage) | language detector for React Native that saves the user's choice in Async Storage, used for persistence. |
| [electron](https://github.com/neruchev/i18next-electron-language-detector) | language detector for electron apps. |
| [CLI](https://github.com/neet/i18next-cli-language-detector) | language detector for CLI. |

## post processors

| **post** **processor** | **description** |
| :--- | :--- |
| [sprintf post processor](https://github.com/i18next/i18next-sprintf-postProcessor) | sprintf post processor for i18next. |
| [interval plurals](https://github.com/i18next/i18next-intervalPlural-postProcessor) | interval based plurals like. "One Item", "A few items", "A lot of items" |
| [i18next-react-postprocessor](https://github.com/orzechowskid/i18next-react-postprocessor) | embed React elements inside your i18next translation strings |
| [i18next-korean-postposition-processor](https://github.com/Perlmint/i18next-korean-postposition-processor) | i18next post-processor for processing korean postposition |
| [i18next-pseudo](https://github.com/MattBoatman/i18next-pseudo) | i18next post-processor for pseudolocalization of strings |
| [i18next-emoji-postprocessor](https://github.com/i18next/i18next-emoji-postprocessor) | i18next postProcessor plugin for Node.js and in the browser that replaces all words with emojis. |

## loggers

Only the integrated console logger is available for now.

## Create your own plugin

Want to create your own plugins? Learn more [here](../misc/creating-own-plugins.md).

