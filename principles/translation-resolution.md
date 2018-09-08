# Translation Resolution

The process of translating keys is the heart of i18next, and as such this document should serve as a guide to the overall process by which i18next attempts to translate your keys into the appropriate content for a given location, be it on a specific page and/or for a user in a particular region of the world.

## Core Elements

### Keys

A key is not unlike a key in any object structure, like JSON or a dictionary in Python. A key is a specific set of text that, when looked up, provides a corresponding value.

#### Example:

```text
"key": "value"
```

This example shows the very core concept of what a key is capable of expressing, but the ability to express this formally is very important, as it allows us to expand its utility going forward.

Keys are very powerful ways of specifying the different forms of an element, be it a piece of text or other forms of content, into its potential variations.

For more information on all of the different ways keys can be used, please see the documentation for the [translation function](../translation-function/essentials.md).

### Languages

A language is what you would expect; the language to be used for translating a key. When we look for a key, we specify a language with it, so that we know which version of the key to use. The important thing to note about this is that _if a key is not found, you can gracefully fall back to other languages_.

In i18next, a language is a particular value which can be known as a "code". A language code can be expressed in variety of ways, but they generally look something like the following example:

#### Example:

```text
"en-US"
```

For more information on the subject, it is recommended to read up on [IETF Language Codes](https://en.wikipedia.org/wiki/IETF_language_tag).

### Namespaces

A namespace can be thought of as logical groupings of different sets of translations.

For instance, you might have a 3 sections of your app, each with many individual pages in them, but only 2 sections share similar content. If that's the case, instead of loading all of the keys for all 3 sections, you can instead load keys from a "shared" set of translations and break up the other sections into much smaller sets of keys, loading them as needed.

In a given namespace you could have a set of languages, each with their own set of keys.

#### Example

```text
"common" // Things that are reused everywhere, like "Confirm" and "Cancel" on buttons
"validation" // All validation text, like "email address not valid" in a form
"glossary" // Words we want to be reused consistently, like key words in your app
```

For more information on the concept of namespaces and how you might want to use them, please see their [documentation](namespaces.md).

## Resolution Order

 By default, when translating a key, i18next tries the first combination of your **namespace**, **language**, and **key**.

However, if that does not work, i18next attempts to gracefully fall-back to a different combination in order to provide the most relevant translation for a piece of content, the core idea being to try to find a key that exists, from _most specific to least specific_. Here is the process that it uses by default:

#### 1. Similar Keys

If the specific key is not found, i18next tries to match the key you are looking for with a similar key, looking for a key that best fits the **plural** form, **context**, and **singular** form in that order.

#### 2. Languages

If a key is not found, i18next then walks through the list of languages, which consists of the **current language\(s\)** and the **fallback language\(s\)**.

#### 3. Namespaces

If no language matches, i18next walks through the list of namespaces, which similarly to languages, consists of the **current namespace\(s\)** and the **fallback namespace\(s\)**.

#### 4. Fallback Keys

If that key is still not found, i18n will walk through this process with the **fallback key\(s\)**, if specified.

#### 5. Key Not Found

If the key is still not found, i18n will then return the **key itself**, that being the first key specified if you also specified fallback keys.

For more information on each method of fallback, please see the [fallback documentation](fallback.md).
