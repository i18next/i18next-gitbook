
# What is i18next?

<iframe src="https://ghbtns.com/github-btn.html?user=i18next&repo=i18next&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>



[![Travis](https://img.shields.io/travis/i18next/i18next/master.svg?style=flat-square)](https://travis-ci.org/i18next/i18next)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/i18next/i18next)
[![Coveralls](https://img.shields.io/coveralls/i18next/i18next/master.svg?style=flat-square)](https://coveralls.io/github/i18next/i18next)
[![Package Quality](http://npm.packagequality.com/shield/i18next.svg)](http://packagequality.com/#?package=i18next)
[![cdnjs version](https://img.shields.io/cdnjs/v/i18next.svg?style=flat-square)](https://cdnjs.com/libraries/i18next)
[![npm version](https://img.shields.io/npm/v/i18next.svg?style=flat-square)](https://www.npmjs.com/package/i18next)
[![Bower](https://img.shields.io/bower/v/i18next.svg?style=flat-square)]()
[![David](https://img.shields.io/david/i18next/i18next.svg?style=flat-square)](https://david-dm.org/i18next/i18next)

The short answer would be i18next is a internationalization **i18n-framework** written in and for javascript. But it's more than that.

What makes i18next outstanding? It goes over just providing the i18n features \(plurals, context, interpolation, format\) expected. It provides you with a complete solution to localize your product from client to server, from web to mobile and desktop.

## learn once - translate everywhere

<img src="/assets/img/i18next-ecosystem.jpg" width="50%" />

**Learn once - use everywhere**. The community made integrations for frameworks like react.js, angular.js, vue.js and many more. But this is not where it ends...you can use i18next with node.js, php, ios, android and other platforms.

I18next reached not only the web, but also mobile and desktop development.

[Learn more about frameworks supported](/supported-frameworks.md)

## Complete solution

Most frameworks leave it to you how the translations get loaded from the server. You are responsible to detect the right user language, to load the translations for that language and push those translations into the framework.

With i18next you get that solved. We provide you with plugins to:

* detecting the user language
* load the translations
* optionally cache the translations
* extending by using post processing - eg. to enable sprintf support

[Learn more about plugins and utils](/plugins-and-utils.md)

## Flexibility

i18next comes with strong defaults but is flexible enough to work in the way you prefer it. Prefer moment.js over intl api for date formatting? Prefer different prefix/suffix for interpolation? Prefer gettext style keys over key based?

[Learn more about options](/configuration-options.md)

## Scalability

The framework was built with scalability in mind. While for smaller projects having one file with all the translation might work with i18next you have the option to separate translations into multiple files and to load them on demand.

[Learn more about namespaces](/principles/namespaces.md)

## Ecosystem

There are tons of modules built for and around i18next from extracting translations from your code, to bundle translations using webpack, to convert gettext, csv, resx to json format.

- [Learn more about plugins and utils](/plugins-and-utils.md)
- [Learn more about frameworks supported](/supported-frameworks.md)

## Localization as a service


It even provides with [locize.com](http://locize.com/?utm_source=i18next_com&utm_medium=gitbook) a own translation management tool - localization as a service offering.

<img src="/assets/img/dashboard.png" width="50%" />

[Learn more about the enterprise offering](/for-enterprises.md)

