# Creating own Plugins

i18next comes with a lot of modules to enhance the features available. There are modules to:

* load resources, eg. via xhr or from filesystem \(node.js\)
* cache resources on client, eg. localStorage
* detect user language by querystring, navigator, cookie, ...
* post processors to further manipulate values, eg. to add sprintf support

The plugins need to support following APIs:

**HINT:** You can provide a singleton or a prototype constructor \(prefered for supporting multiple instances of i18next\).

## backend

Backend plugins are used to load data for i18next.

```javascript
{
  type: 'backend',
  init: function(services, backendOptions, i18nextOptions) {
    /* use services and options */
  },
  read: function(language, namespace, callback) {
    /* return resources */
    callback(null, {
      key: 'value'
    });

    /* if method fails/returns an error, call this: */
    /* callback(truthyValue, null); */
  },

  // optional
  readMulti: function(languages, namespaces, callback) {
    /* return multiple resources - useful eg. for bundling loading in one xhr request */
    callback(null, {
      en: {
        translations: {
          key: 'value'
        }
      },
      de: {
        translations: {
          key: 'value'
        }
      }
    });

    /* if method fails/returns an error, call this: */
    /* callback(truthyValue, null); */
  },

  // only used in backends acting as cache layer
  save: function(language, namespace, data) {
    // store the translations
  },

  create: function(languages, namespace, key, fallbackValue) { 
    /* save the missing translation */
  }
}
```

{% hint style="info" %}
Using `readMulti` is only supported when using the [https://github.com/i18next/i18next-multiload-backend-adapter](https://github.com/i18next/i18next-multiload-backend-adapter)
{% endhint %}

## languageDetector

Language Detector plugins are used to detect language in user land.

```javascript
{
  type: 'languageDetector',
  async: true, // If this is set to true, your detect function receives a callback function that you should call with your language, useful to retrieve your language stored in AsyncStorage for example
  init: function(services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: function(callback) { // You'll receive a callback if you passed async true
    /* return detected language */
    // callback('de'); if you used the async flag
    return 'de';
  },
  cacheUserLanguage: function(lng) {
    /* cache language */
  }
}
```

## post processor

Post Processors are used to extend or manipulate the translated values before returning them in `t` function.

\(Post Processors do not need to be prototype functions\)

```javascript
{
  type: 'postProcessor',
  name: 'nameOfProcessor',
  process: function(value, key, options, translator) {
    /* return manipulated value */
    return value;
  }
}
```

## logger

Override the built in console logger.

\(loggers do not need to be prototype functions\)

```javascript
{
  type: 'logger',

  log: function(args) {},
  warn: function(args) {},
  error: function(args) {}
}
```

## Helpful tips

### Make sure to set the plugin type

If you do not set the plugin type, you may get an error like this.

`... No [plugin type] was added via i18next.use. Will not load resources.`

If you are creating a class for your plugin, you may set the type like in the following example \(the following is an example if you are making a backend plugin\):

```javascript
class Backend {
  constructor(services, backendOptions, i18nextOptions){

  }

  // other required methods;
  // ie. read, create, etc.
}
Backend.type = "backend";

export default Backend;
```

### Create a private method to initialize your plugin

The constructor of your plugin \(if the plugin is of type `backend` or `languageDetector`\) will be [called without arguments](https://github.com/i18next/i18next/issues/1379#issuecomment-571913660) if you use the plugin as a class. Using the plugin as a class looks like this:

```javascript
import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import i18nBackend from "my-custom-backend";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    backend: {
      // custom options
    },
    // other options
  });
```

While using your plugin in this way, you may want to validate the `options` passed into the **backend** property of the `.init` method. A good way to validate them is to have a private method where you initialize your plugin.

```javascript
class Backend {
  constructor(services, backendOptions = {}, i18nextOptions = {}){
    this.init(services, backendOptions, i18nextOptions);
  }

  init(services, backendOptions, i18nextOptions){
    // Validate backendOptions
  }

  // other required methods;
  // ie. read, create, etc.
}
Backend.type = "backend";

export default Backend;
```

