<!-- toc -->
# Add or Load Translations

There are a few options to load translations to your application instrumented by i18next. The most common approach to this adding a so called **backend plugin** to i18next. The range of backends is large from loading translations in the browser using xhr request to loading translations from databases or filesystem in nodejs.  


## Add on init
{% method %}


You can add the translations on init

{% sample lang="js" %}

```js
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

{% endmethod %}


## Add after init
{% method %}

You can add the translations after init

{% sample lang="js" %}

```js
import i18next from 'i18next';

i18next.init();
i18next.addResourceBundle('en', 'namespace1', {
  key: 'hello from namespace 1'
});
```

{% endmethod %}

There are more options to adding, removing translations...learn more about [resource handling](/api.md).



## Load using a backend plugin
{% method %}


Each plugin comes with a set of on configuration settings like path to load resources from. Those settings are documented on the individual readme file of each repository.

{% sample lang="js" %}
Here is a sample using the [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend) to load resources from the server.

```js
import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';

i18next
  .use(Backend)
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });
```

{% endmethod %}


