<!-- toc -->
# API

## init

`i18next.init(options, callback)`

Initializes the i18next instance.

```js
i18next.init(options, (err, t) => {
  // resources have been loaded
});
```

Please read the [options page](../options/) for details.


## use

`i18next.use(module)`

Add modules like backend or caching layer to be used.

```js
import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import postProcessor from 'i18next-sprintf-postprocessor';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(Cache)
  .use(LanguageDetector)
  .use(postProcessor)
  .init(options, callback);
```

For details see the documentation of the added module.

## t

`i18next.t(key, options)`

The translation function.

Please read the [translate pages](../../translate/) for details.


## exists

`i18next.exists(key, options)`

Uses the same resolve functionality as the `t` function and returns true if a key exists.


## getFixedT

`i18next.getFixedT(lng, ns)`

Returns a `t` function that defaults to given language or namespace.

```js
let de = i18next.getFixedT('de');
de('myKey');

// or fix the defaultNamespace
let anotherNamespace = i18next.getFixedT(null, 'anotherNamespace');
anotherNamespace('anotherNamespaceKey'); // no need to prefix ns i18n.t('anotherNamespace:anotherNamespaceKey');
```


## changeLanguage

`i18next.changeLanguage(lng, callback)`

Changes the language.

```js
i18next.changeLanguage('en', (err, t) => {
  // resources have been loaded
});
```

**HINT:** For easy testing - setting lng to 'cimode' will set t function to return the key.


## language

`i18next.language`

gets the set language.


## languages

`i18next.languages`

gets an array of language-codes that will be used it array order to lookup the translation value.


## loadNamespaces

`i18next.loadNamespaces(ns, callback)`

Loads additional namespaces not defined in init options.

```js
i18next.loadNamespaces('myNamespace', (err, t) => { /* resources have been loaded */ });
i18next.loadNamespaces(['myNamespace1', 'myNamespace2'], (err, t) => { /* resources have been loaded */ });
```


## loadLanguages

`i18next.loadLanguages(lngs, callback)`

Loads additional languages not defined in init options.

```js
i18next.loadLanguages('de', (err, t) => { /* resources have been loaded */ });
i18next.loadLanguages(['de', 'fr'], (err, t) => { /* resources have been loaded */ });
```


## loadResources

`i18next.loadResources(callback)`

Loads resources on given state. Gets called internal on init, changeLanguage.



## reloadResources

`i18next.reloadResources()`

Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to relaod all.

reloadResources(lngs, ns)


## setDefaultNamespace

`i18next.setDefaultNamespace(ns)`

Changes the default namespace.


## dir

`i18next.dir(lng)`

Returns `rtl` or `ltr` depending on languages read direction.


----------

# instance creation

## createInstance

`i18next.createInstance(options, callback)`

Creates a new instance.


## cloneInstance

`i18next.cloneInstance(options, callback)`

Creates a clone of the current instance. Shares store and modules.


-----------

# events

## initialized

`i18next.on('initialized', function(options) {})`

Gets fired after initialization.


## loaded

`i18next.on('loaded', function(loaded) {})`

Gets fired on loading resources.

## failedLoading

`i18next.on('failedLoading', function(lng, ns, msg) {})`

Gets fired on loading resources.

## missingKey

`i18next.on('missingKey', function(lngs, namespace, key, res) {})`

Gets fired on accessing a key not existing.


## added

`i18next.on('added', function(lng, ns) {})`

Gets fired when resources got added.


## removed

`i18next.on('removed', function(lng, ns) {})`

Gets fired when resources got removed.


## languageChanged

`i18next.on('languageChanged', function(lng) {})`

Gets fired when changeLanguage got called.


---------

# resource handling

Can be accessed on `i18next` or `i18next.services.resourceStore`


## getResource

`i18next.getResource(lng, ns, key, options)`

Gets one value by given key.


## addResource

`i18next.addResource(lng, ns, key, value, options)`

Adds one key/value.


## addResources

`i18next.addResources(lng, ns, resources)`

Adds multiple key/values.


##addResourceBundle](#add-resource-bundle

`i18next.addResourceBundle(lng, ns, resources, deep, overwrite)`

Adds a complete bundle. Optionally extends existing bundle deep and overwrites existing values.


## hasResourceBundle

`i18next.hasResourceBundle(lng, ns)`

Checks if a resource bundle exists.


## getResourceBundle

`i18next.getResourceBundle(lng, ns)`

Returns a resource bundle.


## removeResourceBundle

`i18next.removeResourceBundle(lng, ns)`

Removes an existing bundle.