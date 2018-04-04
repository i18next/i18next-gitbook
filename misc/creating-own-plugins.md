<!-- toc -->
# Creating own Plugins

i18next comes with a lot of modules to enhance the features available. There are modules to:

- load resources, eg. via xhr or from filesystem (node.js)
- cache resources on client, eg. localStorage
- detect user language by querystring, navigator, cookie, ...
- post processors to further manipulate values, eg. to add sprintf support


The plugins need to support following APIs:

**HINT:** You can provide a singleton or a prototype constructor (prefered for supporting multiple instances of i18next).

## backend

Backend plugins are used to load data for i18next.

```js
{
  type: 'backend',
  init: function(services, backendOptions, i18nextOptions) {
    /* use services and options */
  },
  read: function(language, namespace, callback) {
    /* return resources */
    return {
      key: 'value'
    };
  },

  // optional
  readMulti: function(languages, namespaces, callback) {
    /* return multiple resources - usefull eg. for bundling loading in one xhr request */
    return {
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
    }
  },
  
  create: function(languages, namespace, key, fallbackValue) { 
    /* save the missing translation */
  }
}
```

## cache - will be deprecated

Cached will be deprecated in future release and could be replaced with the [chained backend](https://github.com/i18next/i18next-chained-backend). For an example checkout the replacement for [localstorage](https://github.com/i18next/i18next-localstorage-backend).




Cache plugins are used to cache resources on consumers.

```js
{
  type: 'cache',
  init: function(services, cacheOptions, i18nextOptions) {
    /* use services and options */
  },
  load: function(lngs, callback) {
    /* load resources for languages */
    callback({
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
  save: function(store) { /* update cache */ }
}
```

## languageDetector

Language Detector plugins are used to detect language in user land.

```js
{
  type: 'languageDetector',
  init: function(services, detectorOptions, i18nextOptions) {
    /* use services and options */
  },
  detect: function() { 
    /* return detected language */
    return 'de';
  },
  cacheUserLanguage: function(lng) {
    /* cache language */
  }
}
```


## post processor

Post Processors are used to extend or manipulate the translated values before returning them in `t` function.

(Post Processors do not need to be prototype functions)

```js
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

(loggers do not need to be prototype functions)

```js
{
  type: 'logger',

  log: function(args) {},
  warn: function(args) {},
  error: function(args) {}
}
```