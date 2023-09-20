---
description: Do you want to define a fallback which uses local translations?
---

# Backend Fallback

## Browser fallback with local / bundled translations

With i18next you can configure a fallback backend to be used in the browser. It will try to load from your primary backend (in this case from your [http backend](https://github.com/i18next/i18next-http-backend)) and if the primary backend is not reachable or does not serve translations, your second backend (in this case [local or bundled](https://github.com/i18next/i18next-resources-to-backend) translations) will be used. This is all possible thanks to the [chained backend](https://github.com/i18next/i18next-chained-backend).

```javascript
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

const bundledResources = {
  en: {
    translation: {
      key: 'value'
    }
  }
};

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend(bundledResources)
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

### You can also lazy load the in memory translations, i.e. when using webpack

```javascript
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(ChainedBackend)
  .init({
    fallbackLng: "en",
    // ... your i18next config
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend((lng, ns) => import(`./locales/${lng}/${ns}.json`))
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

{% hint style="info" %}
More information can be found here:\
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)\
[i18next-resources-to-backend](https://github.com/i18next/i18next-resources-to-backend)\
[i18next-http-backend](https://github.com/i18next/i18next-http-backend)
{% endhint %}

## Server side fallback with filesystem

On server side you can also use the i18next-fs-backend for example instead of the in memory fallback.

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
        HttpBackend,
        FsBackend
      ],
      backendOptions: [{
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      }, {
        loadPath: './locales_cache/{{lng}}/{{ns}}.json'
      }]
    }
  });
```

{% hint style="info" %}
More information can be found here:\
[i18next-chained-backend](https://github.com/i18next/i18next-chained-backend)\
[i18next-fs-backend](https://github.com/i18next/i18next-fs-backend)\
[i18next-http-backend](https://github.com/i18next/i18next-http-backend)
{% endhint %}

{% hint style="danger" %}
We suggest not to use multiple backends with the [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) in combination with saveMissing or updateMissing, because it may happen, that the trigger for this is based on stale data.
{% endhint %}
