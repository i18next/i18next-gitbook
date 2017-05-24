<!-- toc -->
# Configuration options

`i18next.init(options, callback)`

All options for calling init or createInstance.

## logging

option            | default             | description
----------------- | --------------------| -----------------
debug             | false               | logs info level to console output. Helps finding issues with loading not working.

## languages and namespaces

option            | default             | description
----------------- | --------------------| -----------------
lng               | undefined           | language to use (disables language detection)
fallbackLng       | 'dev'               | language to lookup translations if user language is not available. [Learn more](/principles/fallback.md).
whitelist         | false               | array of allowed languages
nonExplicitWhitelist | false            | if true will pass eg. en-US if finding en in whitelist
lowerCaseLng      | false               | language will be lowercased eg. en-US --> en-us
ns                | 'translation'       | string or array of namespaces
defaultNS         | 'translation'       | default namespace used if not passed to translation function
fallbackNS        | false               | string or array of namespaces to lookup key if not found in given namespace. [Learn more](/principles/fallback.md).





option            | default             | description
----------------- | --------------------| -----------------
initImmediate     | true                | triggers resource loading in init function inside setTimeout (default async behaviour)
resources         | undefined           | resources to initialize with



load              | 'all'               | language codes to lookup, given set language is 'en-US': `'all' --> ['en-US', 'en', 'dev']`, `'currentOnly' --> 'en-US'`, `'languageOnly' --> 'en'`
preload           | false               | array of languages to preload
keySeparator      | '.'                 | char to separate keys
nsSeparator       | ':'                 | char to split namespace from key
pluralSeparator   | '\_'                 | char to split plural from key
contextSeparator  | '\_'                 | char to split context from key
simplifyPluralSuffix | true             | will use 'plural' as suffix for languages only having 1 plural form, setting it to false will suffix all with numbers
saveMissing       | false               | calls save missing key function on backend if key not found
saveMissingTo     | 'fallback'          | 'current' or 'all'
missingKeyHandler | false               | `function(lng, ns, key, fallbackValue) { }` used for custom  missing key handling (needs saveMissing set to true!)
parseMissingKeyHandler | noop           | function(key) { // return value to display }
appendNamespaceToMissingKey | false     | appends namespace to missing key
appendNamespaceToCIMode | false 		| prefixes the namespace to the string when using `cimode`
postProcess       | false               | string or array of postProcessors to apply per default
returnNull        | true                | allows null values as valid translation
returnEmptyString | true                | allows empty string as valid translation
returnObjects     | false               | allows objects as valid translation result
returnedObjectHandler | noop            | `function(key, value, options) {}` gets called if object was passed in as key but returnObjects was set to false
joinArrays        | false               | char, eg. '\n' that arrays will be joined by
overloadTranslationOptionHandler | function(args) { return { defaultValue: args[1] }; }; | default: sets defaultValue
interpolation     | {...}               | see interpolation options below
detection         | undefined           | options for language detection - see detector documentation
backend           | undefined           | options for backend - see backend documentation
cache             | undefined           | options for cache layer -- see cache documentation


