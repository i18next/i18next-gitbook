# Caching

## Browser caching with local storage

With i18next you can configure a cache layer to be used in the browser. It will load and cache resources from [localStorage](https://github.com/i18next/i18next-localstorage-backend) and can be used in combination with the [chained backend](https://github.com/i18next/i18next-chained-backend).

```javascript
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import ChainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

i18next
  .use(ChainedBackend)
  .use(LanguageDetector)
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
import HttpBackend from "i18next-http-backend";
import ChainedBackend from "i18next-chained-backend";
import FsBackend from "i18next-fs-backend";

i18next
  .use(ChainedBackend)
  .use(LanguageDetector)
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
import HttpBackend from "i18next-http-backend";
import ChainedBackend from "i18next-chained-backend";
import AsyncStorageBackend from "i18next-async-storage-backend";

i18next
  .use(ChainedBackend)
  .use(LanguageDetector)
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

