# Caching

## Browser caching with local storage

With i18next you can configure a cache layer to be used in the browser. It will load and cache resources from [localStorage](https://github.com/i18next/i18next-localstorage-backend) and can be used in combination with the [chained backend](https://github.com/i18next/i18next-chained-backend).

```javascript
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        LocalStorageBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

{% hint style="info" %}
More information can be found here:  
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)  
[i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)  
[i18next-http-backend](https://github.com/i18next/i18next-http-backend)
{% endhint %}

## Server side caching with filesystem

With i18next you can configure a cache layer to be used on server side. It will load and cache resources from the [filesystem](https://github.com/i18next/i18next-fs-backend) and can be used in combination with the [chained backend](https://github.com/i18next/i18next-chained-backend).

```javascript
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import FsBackend from "i18next-fs-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        FsBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        loadPath: './locales_cache/{{lng}}/{{ns}}.json',
        addPath: './locales_cache/{{lng}}/{{ns}}.json' // make sure the folders "locales_cache/{{lng}}" exists
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

{% hint style="info" %}
More information can be found here:  
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)  
[i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)  
[i18next-http-backend](https://github.com/i18next/i18next-http-backend)
{% endhint %}

## React-native caching with AsyncStorage

With i18next you can configure a cache layer to be used on react-native. It will load and cache resources from the [AsyncStorage](https://github.com/timbrandin/i18next-async-storage-backend) and can be used in combination with the [chained backend](https://github.com/i18next/i18next-chained-backend).

```javascript
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import AsyncStorageBackend from "i18next-async-storage-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        AsyncStorageBackend,
        HttpBackend
      ],
      backendOptions: [{
        expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
      }, {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

{% hint style="info" %}
More information can be found here:  
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)  
[i18next-async-storage-backend](https://github.com/timbrandin/i18next-async-storage-backend)  
[i18next-http-backend](https://github.com/i18next/i18next-http-backend)
{% endhint %}

## Next.js caching with next-i18next

With [next-i18next](https://github.com/i18next/next-i18next) v16+, you can use client-side caching with [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) and [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend). Translations are bundled at build time (via `resourceLoader` for App Router or `serverSideTranslations` for Pages Router), and the client can fetch fresh translations from a backend with localStorage caching.

For a complete example using both App Router and Pages Router with [Locize](https://locize.com), have a look at the [next-i18next-locize example](https://github.com/locize/next-i18next-locize).

### App Router (client-side caching with Locize)

```javascript
// I18nProviderWithLocize.js
'use client'

import { I18nProvider } from 'next-i18next/client'
import LocizeBackend from 'i18next-locize-backend'
import ChainedBackend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'

export function I18nProviderWithLocize({ children, language, resources, supportedLngs, defaultNS }) {
  return (
    <I18nProvider
      language={language}
      resources={resources}
      supportedLngs={supportedLngs}
      defaultNS={defaultNS}
      use={[ChainedBackend]}
      i18nextOptions={{
        backend: {
          backends: [LocalStorageBackend, LocizeBackend],
          backendOptions: [
            { expirationTime: 60 * 60 * 1000 }, // 1 hour
            {
              projectId: '[PROJECT_ID]',
              version: 'latest',
            },
          ],
        },
      }}
    >
      {children}
    </I18nProvider>
  )
}
```

### Pages Router (client-side caching with Locize)

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend = require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: '[PROJECT_ID]',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  partialBundledLanguages: isBrowser && true,
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
}
```

{% hint style="info" %}
More information can be found here:
[next-i18next-locize example](https://github.com/locize/next-i18next-locize)
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)
[i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)
[i18next-locize-backend](https://github.com/locize/i18next-locize-backend)
{% endhint %}

{% hint style="danger" %}
We suggest not to use multiple backends with the [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) in combination with saveMissing or updateMissing, because it may happen, that the trigger for this is based on stale data.
{% endhint %}

