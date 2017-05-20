# Loading Translations

There are a few options to load translations to your application instrumented by i18next. The most common approach to this adding a so called **backend plugin** to i18next. The range of backends is large from loading translations in the browser using xhr request to loading translations from databases or filesystem in node.js.  
  
{% method %}
## Adding backend plugins

Each plugin comes with a set of on configuration settings like path to load resources from. Those settings are documented on the individual readme file of each repository.

{% sample lang="js" %}
Here is a sample using the i18next-xhr-backend to load resources from the server.

```js
import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';

i18next
  .use(Backend)
  .init({
    // for all options check the backend's repository readme file
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  });
```





