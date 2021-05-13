# FAQ

## Misc

### **i18next is awesome. How can i support the project?**

_There are a lot of ways to support us. Make a PR for a feature requested. Improve the documentation. Help others to get started. Spread the word._

_Further you could try_ [_locize.com_](http://locize.com) _- our localization as a service offering. It's like donating to i18next but with additional benefits for you - like saving hours of time translating your project._

## Loading issues

### **I don't see my translations!!!**

_Try setting_ `debug: true` _on init and check the console log. There rather sure is a warning for unable to resolve the loadPath or invalid json. Check if the translation files are accessible via browser._

## Translation

### **How do i know which plural suffix i have to use?**

_On the_ [_plural page_](../translation-function/plurals.md) _there is a tool to get them._

### How should the language codes be formatted?

_Theoretically, you're not bound to any specific language code format, but if you want to make use of all the in built language features, like proper_ [_pluralization_](../translation-function/plurals.md) _and correct_ [_fallback resolution_](../principles/fallback.md#language-fallback)_, we strongly suggest to use the following iso norm:_

`lng-(script)-REGION-(extensions)`  
  
_i.e._

* _en, en-US or en-GB_
* _zh, zh-HK or zh-hant-HK_

_Other examples are listed here:_ [_https://www.iana.org/assignments/language-tags/language-tags.xhtml_](https://www.iana.org/assignments/language-tags/language-tags.xhtml)\_\_

_And more information about the format can be found here:_ [_https://www.w3.org/International/articles/language-tags/_](https://www.w3.org/International/articles/language-tags/)\_\_

## Process

### **How do i keep overview over my translation progress?**

_Might be time to use a translation management tool._

### **How to handle with changes in e2e tests?**

_For e2e tests a good tactic is to set language to_ `cimode` _on init. This will set i18next to always return the key on calling_ `i18next.t`_. Want to add the namespace to returned value change_ `appendNamespaceToCIMode: true` _on init._

