# Plugins

i18next comes with a lot of modules to enhance the features available. There are modules to:

* load resources, eg. via xhr or from filesystem \(node.js\)
* cache resources using eg. [i18next-localstorage-backend](https://github.com/i18next/i18next-localstorage-backend)
* detect user language by querystring, navigator, cookie, …
* post processors to further manipulate values, eg. to add sprintf support

```javascript
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import sprintf from 'i18next-sprintf-postprocessor';

i18next
  .use(XHR) // or any other backend implementation
  .use(LanguageDetector) // or any other implementation
  .use(sprintf) // or any other post processor
  .init(options);
```

For usage details please read the documentation of the plugin \(readme file in the repository or npm website\).

