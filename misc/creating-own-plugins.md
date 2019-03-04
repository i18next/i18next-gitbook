# Creating own Plugins

## Creating own Plugins

i18next comes with a lot of modules to enhance the features available. There are modules to:

* load resources, eg. via xhr or from filesystem \(node.js\)
* cache resources on client, eg. localStorage
* detect user language by querystring, navigator, cookie, ...
* post processors to further manipulate values, eg. to add sprintf support

The plugins need to support following APIs:

**HINT:** You can provide a singleton or a prototype constructor \(prefered for supporting multiple instances of i18next\).

### backend

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
  },

  // optional
  readMulti: function(languages, namespaces, callback) {
    /* return multiple resources - usefull eg. for bundling loading in one xhr request */
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

### languageDetector

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

### post processor

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

### logger

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

