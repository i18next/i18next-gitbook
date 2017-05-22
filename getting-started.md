<!-- toc -->
# Getting started

## Install

i18next can be added to your project using npm or bower:

```bash
# npm
$ npm install i18next --save

# bower
$ bower install i18next
```

The default export is for UMD (commonjs, requirejs, global).

In the `/dist` folder you find additional builds for commonjs, es6 modules. Useful if you like to load i18next in webpack, rollup, ... or node.js. The correct entry points are already configured in the package.json.

## Load from CDN

You can also directly add a script tag loading i18next from one of the CDNs providing it:


- [unpkg](https://unpkg.com/i18next/i18next.js)
- [unpkg min](https://unpkg.com/i18next/i18next.min.js)

- [cdnjs](https://cdnjs.com/libraries/i18next)


## Basic sample

[source code](https://jsfiddle.net/jamuhl/wb1qvxu9/#tabs=js,result,html)

As you might see this basic sample does not yet display results in different languages...lets extend this:

[source code](https://jsfiddle.net/jamuhl/dvk0e8a9/#tabs=result,js,html)

While this is a more complete sample you should look into further options to get most our of this internationalization library:

- Find an extension for your project, eg. **react-i18next**, **jquery-i18next** and **others**. Using those wrappers around i18next makes using i18next a lot simpler in your project.
- Add a **language detector** to detect the preferred language of your user
- Add a **backend plugin** to load the translations from the server or filesystem

