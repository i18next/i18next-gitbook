# Plugins

i18next [comes with a lot of modules](../overview/plugins-and-utils.md) to enhance the features available. There are modules to:

* [load resources](https://www.i18next.com/overview/plugins-and-utils#backends), eg. via [http fetch](https://github.com/i18next/i18next-http-backend) or from [filesystem](https://github.com/i18next/i18next-fs-backend) \(Node.js, Deno\)
* [cache resources](../how-to/caching.md) using eg. [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)
* [detect user language](https://www.i18next.com/overview/plugins-and-utils#language-detector) by querystring, navigator, cookie, …
* [post processors](https://www.i18next.com/overview/plugins-and-utils#post-processors) to further manipulate values, eg. to add sprintf support

```javascript
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import sprintf from 'i18next-sprintf-postprocessor';

i18next
  .use(Backend) // or any other backend implementation
  .use(LanguageDetector) // or any other implementation
  .use(sprintf) // or any other post processor
  .init(options);
```

For usage details please read the documentation of the plugin \(readme file in the repository or npm website\).

{% hint style="info" %}
If you're not sure on why you may need such a plugin, have a look at the [First setup help](../overview/first-setup-help.md) page.
{% endhint %}

{% hint style="success" %}
[Do you like to create your own plugin?](../misc/creating-own-plugins.md)
{% endhint %}



