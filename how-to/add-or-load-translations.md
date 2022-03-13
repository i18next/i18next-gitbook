# Add or Load Translations

There are a few options to load translations to your application instrumented by i18next. The most common approach to this adding a so called [**backend plugin**](https://www.i18next.com/overview/plugins-and-utils#backends) to i18next. The range of backends is large from loading translations in the browser using xhr request to loading translations from databases or filesystem in nodejs.

## Add on init

You can add the translations on init

```javascript
import i18next from 'i18next';

i18next
  .init({
    resources: {
      en: {
        namespace1: {
          key: 'hello from namespace 1'
        },
        namespace2: {
          key: 'hello from namespace 2'
        }
      },
      de: {
        namespace1: {
          key: 'hallo von namespace 1'
        },
        namespace2: {
          key: 'hallo von namespace 2'
        }  
      }
    }
  });
```

## Add after init

You can add the translations after init

```javascript
import i18next from 'i18next';

i18next.init({ resources: {} });
i18next.addResourceBundle('en', 'namespace1', {
  key: 'hello from namespace 1'
});
```

There are more options to adding, removing translations...learn more about [resource handling](../overview/api.md).

{% hint style="info" %}
Please make sure to at least pass in an empty resources object on init. Else i18next will try to load translations and give you a warning that you are not using a backend.
{% endhint %}

### Combined with a backend plugin

If you want to lazy load some translations via a backend plugin, you may need to use the `partialBundledLanguages: true` option. This allows some resources (or no resources) to be set on initialization while others can be loaded using a backend connector.

You may also want to set the `ns` option. To an empty array if you do not want to load any namespaces (also not the [default namespace](../overview/configuration-options.md#languages-namespaces-resources): `'translation'`) or to an array containing the namespaces to load.

```javascript
import i18next from 'i18next';

i18next.init({
  partialBundledLanguages: true,
  ns: [],
  resources: {}
});
i18next.addResourceBundle('en', 'namespace1', {
  key: 'hello from namespace 1'
});
// or via backend
// i18next.loadNamespaces(['myNamespace1', 'myNamespace2'])
// i18next.loadLanguages(['de', 'fr'])
// etc.
```

## Lazy load in memory translations

[i18next-resources-to-backend](https://github.com/i18next/i18next-resources-to-backend) helps to transform resources to an i18next backend. This means, you can also lazy load translations, for example when using webpack:

```javascript
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(resourcesToBackend((language, namespace, callback) => {
    import(`./locales/${language}/${namespace}.json`)
      .then((resources) => {
        callback(null, resources)
      })
      .catch((error) => {
        callback(error, null)
      })
  }))
  .init({ /* other options */ })
```

## Load using a backend plugin

Each [plugin](../principles/plugins.md) comes with a set of configuration settings like path to load resources from. Those settings are documented on the individual readme file of each repository.

Here is a sample using the [i18next-http-backend](https://github.com/i18next/i18next-http-backend) to load resources from the server.

```javascript
import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });
```

{% hint style="danger" %}
Having a combination of [defining resources](add-or-load-translations.md#add-on-init) + [having a backend](add-or-load-translations.md#load-using-a-backend-plugin) will not implicitly take one or the other source as fallback resources.\
If you need some fallback behaviour you may use the [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend). A short example can be found [here](https://github.com/i18next/i18next-http-backend/blob/master/example/fallback/app.js).\
With [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend) you can also create some [caching behaviour](caching.md).
{% endhint %}

{% hint style="info" %}
[What's a plugin?](../principles/plugins.md)
{% endhint %}

## Load using a [smart backend plugin](https://github.com/locize/i18next-locize-backend) serving directly from a [CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network)

Just use the [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) to load resources from the [CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network).

```javascript
import i18next from 'i18next';
import Backend from 'i18next-locize-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      projectId: '[PROJECT_ID]',
      apiKey: '[API_KEY]',
      referenceLng: '[LNG]'
    }
  });
```

[Here](https://github.com/locize/react-tutorial) you can find a step by step guide with a React.js app, which will unleash the full power of i18next in combination with locize.\
See how your developer experience with this localization workflow [could look like](https://youtu.be/osScyaGMVqo).\
There's also the possibility to have an [even more focused developer experience](https://youtu.be/VfxBpSXarlU), with the help of the [auto-machinetranslation workflow](https://docs.locize.com/whats-inside/auto-machine-translation) and the use of the save missing keys functionality, new keys not only gets added to locize automatically, while developing the app, but are also [automatically translated](https://youtu.be/VfxBpSXarlU) into the target languages using machine translation (like [Google Translate](https://cloud.google.com/translate)).

{% embed url="https://youtu.be/osScyaGMVqo" %}

{% embed url="https://youtu.be/VfxBpSXarlU" %}

#### [**locize**](https://locize.com) is the perfect translation management tool for your [**i18next**](https://www.i18next.com) project

#### ➡️ [i18next](https://www.i18next.com) + [locize](https://locize.com) = [true continuous localization](https://locize.com/how-it-works.html#continouslocalization)
