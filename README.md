
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

The short answer is, that i18next is an **internationalization-framework** written in and for JavaScript. But it's much more than that.

i18next goes beyond just providing the standard i18n features such as \(plurals, context, interpolation, format\). It provides you with a complete solution to localize your product from web to mobile and desktop.

## learn once - translate everywhere

<img src="/assets/img/i18next-ecosystem.jpg" width="50%" />

The i18next-community created integrations for frontend-frameworks such as React, AngularJS, Vue.js and many more. 

But this is not where it ends...you can also use i18next with Node.js, PHP, iOS, Android and other platforms.

[Learn more about supported frameworks](/supported-frameworks.md)

## Complete solution

Most frameworks leave it to you how translations are being loaded. You are responsible to detect the user language, to load the translations and push them into the framework.

i18next takes care of these issue for you. We provide you with plugins to:
* detect the user language
* load the translations
* optionally cache the translations
* extention, by using post-processing - e.g. to enable sprintf support

[Learn more about plugins and utilities](/plugins-and-utils.md)

## Flexibility

i18next comes with strong defaults but it is flexible enough to fulfill custom needs. 
* Use moment.js over intl for date formatting? 
* Prefer different pre- and suffixes for interpolation?
* Like gettext style keys better?

i18next has you covered!

[Learn more about options](/configuration-options.md)

## Scalability

The framework was built with scalability in mind. For smaller projects, having a single file with all the translation might work, but for larger projects this approach quickly breaks down. i18next gives you the option to separate translations into multiple files and to load them on demand.

[Learn more about namespaces](/principles/namespaces.md)

## Ecosystem

There are tons of modules built for and around i18next: from extracting translations from your code over bundling translations using webpack, to converting gettext, CSV and RESX to JSON.

- [Learn more about plugins and utils](/plugins-and-utils.md)
- [Learn more about frameworks supported](/supported-frameworks.md)

## Localization as a service

Through [locize.com](http://locize.com/?utm_source=i18next_com&utm_medium=gitbook), i18next even provides its own translation management tool: localization as a service.

<img src="/assets/img/dashboard.png" width="50%" />

[Learn more about the enterprise offering](/for-enterprises.md)

