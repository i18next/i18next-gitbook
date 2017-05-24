<!-- toc -->
# API

{% method %}
## init

`i18next.init(options, callback)`

The default export of the i18next module is an i18next instance ready to be initialized by calling `init`. You can create additional instances using the [createInstance](//#createinstance) function.

Please read the [options page](../options/) for details on configuration options.

The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).

{% sample lang="js" %}

```js
i18next.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});

// with only callback
i18next.init((err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});
```

{% endmethod %}

{% method %}
## use

`i18next.use(module)`

The use function is there to load additional plugins to i18next.

For available module see the [plugins page](/plugins-and-utils.md) and don't forget to read the documentation of the plugin.

{% sample lang="js" %}

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

{% endmethod %}

{% method %}
## t

`i18next.t(key, options)`

Please have a look at the translation functions like [interpolation](/interpolation.md), [formatting](/formatting.md) and [plurals](/plurals.md) for more details on using it.


{% sample lang="js" %}

```js
i18next.t('my.key'); // -> will return value in set language
```

{% endmethod %}


{% method %}
## exists

`i18next.exists(key, options)`

Uses the same resolve functionality as the `t` function and returns true if a key exists.

{% sample lang="js" %}

```js
i18next.exits('my.key'); // -> true if exists, false if not
```

{% endmethod %}


{% method %}
## getFixedT

`i18next.getFixedT(lng, ns)`

Returns a `t` function that defaults to given language or namespace.

Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.

On the returned function you can like in the `t` function override the languages or namespaces by passing them in options or by prepending namespace.

{% sample lang="js" %}

```js
// fix language to german
const de = i18next.getFixedT('de');
de('myKey');

// or fix the namespace to anotherNamespace
const anotherNamespace = i18next.getFixedT(null, 'anotherNamespace');
anotherNamespace('anotherNamespaceKey'); // no need to prefix ns i18n.t('anotherNamespace:anotherNamespaceKey');
```

{% endmethod %}

{% method %}
## changeLanguage

`i18next.changeLanguage(lng, callback)`

Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.

**HINT:** For easy testing - setting lng to 'cimode' will set t function to always return the key.


{% sample lang="js" %}

```js
i18next.changeLanguage('en', (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
});
```

{% endmethod %}


## language

`i18next.language`

Is set to the current detected or set language.

If you need the primary used language depending on your configuration (whilelist, load) you will prefer using `i18next.languages[0]`.


## languages

`i18next.languages`

Is set to an array of language-codes that will be used it order to lookup the translation value.



{% method %}
## loadNamespaces

`i18next.loadNamespaces(ns, callback)`

Loads additional namespaces not defined in init options.


{% sample lang="js" %}


```js
i18next.loadNamespaces('myNamespace', (err, t) => { /* resources have been loaded */ });
i18next.loadNamespaces(['myNamespace1', 'myNamespace2'], (err, t) => { /* resources have been loaded */ });
```

{% endmethod %}



{% method %}
## loadLanguages

`i18next.loadLanguages(lngs, callback)`

Loads additional languages not defined in init options (preload).

{% sample lang="js" %}


```js
i18next.loadLanguages('de', (err, t) => { /* resources have been loaded */ });
i18next.loadLanguages(['de', 'fr'], (err, t) => { /* resources have been loaded */ });
```
{% endmethod %}


{% method %}
## reloadResources

`i18next.reloadResources()`

Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.

{% sample lang="js" %}


```js
// reload all
i18next.reloadResources();

// reload languages
i18next.reload(['de', 'fr']);

// reload namespaces for all languages
i18next.reload(null, ['ns1', 'ns2']);

// reload namespaces in languages
i18next.reload(['de', 'fr'], ['ns1', 'ns2']);
```


{% endmethod %}


## setDefaultNamespace

`i18next.setDefaultNamespace(ns)`

Changes the default namespace.


{% method %}
## dir

`i18next.dir(lng)`

Returns `rtl` or `ltr` depending on languages read direction.

{% sample lang="js" %}


```js
i18next.dir('en'); // -> "ltr";
i18next.dir('ar'); // -> "rtl";

// get direction for the current used language
const usedLocal = i18next.languages[0]; // -> "en-US"
const usedLanguage = i18next.services.languageUtils.getLanguagePartFromCode(usedLocal); // -> "en"

i18next.dir(usedLanguage); // -> "ltr"

```

{% endmethod %}


----------

# instance creation

{% method %}
## createInstance

`i18next.createInstance(options, callback)`

Will return a new i18next instance.

Please read the [options page](../options/) for details on configuration options.

Providing a callback will automatically call init.

The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).

{% sample lang="js" %}


```js
const newInstance = i18next.createInstance({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
}));

// is the same as
const newInstance = i18next.createInstance();
newInstance.init({
  fallbackLng: 'en',
  ns: ['file1', 'file2'],
  defaultNS: 'file1',
  debug: true
}, (err, t) => {
  if (err) return console.log('something went wrong loading', err);
  t('key'); // -> same as i18next.t
}));

```

{% endmethod %}





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


## addResourceBundle

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