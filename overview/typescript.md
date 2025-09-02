# TypeScript

{% hint style="info" %}
Note: TypeScript support has improved significantly in v25.4 with the `enableSelector` option.

As of v25.4, this option is off by default, but will be set to `true` by default in v26, with tentative plans to deprecate type-level support for the "string-based" (non-selector) API in v27.
{% endhint %}

i18next has embedded type definitions. If you want to enhance IDE Experience and prevent errors (such as type coercion), you should follow the instructions below in order to get the t function fully-type safe (keys and return type).

{% hint style="info" %}
This is an optional feature and may affect the **compilation time** depending on your project's size. If you opt not to leverage the type enhancements suggested here, you can ignore this section.
{% endhint %}

{% hint style="info" %}
Make sure your tsconfig compilerOptions has the [`strict`](https://www.typescriptlang.org/tsconfig#strict) flag or the [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) set to `true`.\
The newest i18next versions only support **TypeScript v5**. Older TypeScript versions are not supported any longer with `i18next > v23`.\
⚠ _To use it with TypeScript v4, use `i18next@22.5.1`._
{% endhint %}

{% hint style="warning" %}
If your project spans multiple i18next instances with different translation resources, it might take a little extra work to set up type-safe translations.

For each instance you'll need to create a separate `tsconfig.json` and `i18next.d.ts` file. See [ahrjarrett/i18next-monorepo](https://github.com/ahrjarrett/i18next-monorepo) for an example.
{% endhint %}

{% hint style="success" %}
[Here](https://locize.com/blog/i18next-typescript/) you'll find a simple guide on how to best use TypeScript for i18next.\
Discover how to unleash the full potential of i18next in your TypeScript applications by mastering type-safe translations, ensuring accurate localization and eliminating runtime errors.\
[![](../.gitbook/assets/title.jpg)](https://locize.com/blog/i18next-typescript/)
{% endhint %}

{% embed url="https://youtu.be/GLIas4DH3Ww" %}

## Create a declaration file

TypeScript definitions for i18next can be extended by using [Type Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) and [Merging Interfaces](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces). So the first step is creating a declaration file (`i18next.d.ts`), for example:

```typescript
// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns1 from "locales/en/ns1.json";
import ns2 from "locales/en/ns2.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ns1";
    // custom resources type
    resources: {
      ns1: typeof ns1;
      ns2: typeof ns2;
    };
    // other
  }
}
```

Or, if you want to include all namespaces at once, you can use our preferred approach:

**`i18n.ts`**

```typescript
export const defaultNS = "ns1";
export const resources = {
  en: {
    ns1,
    ns2,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["ns1", "ns2"],
  defaultNS,
  resources,
});
```

**`i18next.d.ts`**

```typescript
import { resources, defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}
```

**We recommend creating a `@types` directory under `src` or above it and placing all your type declarations there. E.g.: `@types/i18next.d.ts`**

### Some examples

* [various examples](https://github.com/locize/i18next-typescript-examples) _(from simple i18next only to react-i18next prod ready)_
* [react-i18next](https://github.com/i18next/react-i18next/tree/master/example/react-typescript)
* [next-i18next](https://github.com/i18next/next-i18next/tree/master/examples/simple)
* [next-13-app-dir-i18next-example-ts](https://github.com/i18next/next-13-app-dir-i18next-example-ts)
* [react-i18next-example-app-ts](https://github.com/locize/react-i18next-example-app-ts)

### Custom Type Options

We provide a few options that can improve TypeScript for `i18next`. All options come with default values, and if you want to change them, you just need to add them under `CustomTypeOptions` interface in your i18next type declaration file (`i18next.d.ts`).

| option                    | default       | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enableSelector            | false         | <p>if set to <code>true</code>, pass a selector function as the first argument to <code>t</code> to make a translation query.<br><br>if set to <code>"optimize"</code>, i18next is capable of handling arbitrarily large translation sets without slowing down IDE performance. Keeping in mind with this setting, translation keys will not be modified, so you'll need to specify the correct key for pluralization or use a tool like <a href="https://github.com/ahrjarrett/i18next-selector/tree/main/packages/vite-plugin">@i18next-selector/vite-plugin</a>.</p> |
| defaultNS                 | 'translation' | Default namespace. This is more practical in React applications, so when you call `useTranslation()` hooks without passing the namespace, it will infer the types for the `translation` namespace.                                                                                                                                                                                                                                                                                                                                                                      |
| resources                 | object        | Resources to initialize with. This is the most important option that is used to infer the appropriate keys and return types.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| fallbackNS                | false         | Fallback namespace. string or array of namespaces to lookup key if not found in given namespace. [See NS fallback docs](../principles/fallback.md#namespace-fallback).                                                                                                                                                                                                                                                                                                                                                                                                  |
| keySeparator              | '.'           | Char to separate keys.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| nsSeparator               | ':'           | Char to split namespace from key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| pluralSeparator           | '\_'          | Char to split namespace from key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| contextSeparator          | '\_'          | Char to split context from key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| returnNull                | true          | Allows null values as valid translation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| returnObjects             | false         | Allows objects as valid translation result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| compatibilityJSON         | 'v4'          | Only 'v4' is supported. Enable plurals keys support. See [Plurals docs](../translation-function/plurals.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| allowObjectInHTMLChildren | false         | Flag that allows HTML elements to receive objects. This is only useful for React applications where you pass objects to HTML elements so they can be replaced to their respective interpolation values (mostly with Trans component)                                                                                                                                                                                                                                                                                                                                    |
| interpolationPrefix       | '\{{'         | Prefix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| interpolationSuffix       | '\}}'         | Suffix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| strictKeyChecks           | false         | Flag that enables strict key checking even if a `defaultValue` has been provided. This ensures all calls of `t` function don't accidentally use implicitly missing keys.                                                                                                                                                                                                                                                                                                                                                                                                |

## Troubleshooting

### Intellisense not working

Try to update the used TypeScript version _(>= v5 is recommended)_.

### Out of memory (OOM) errors

{% hint style="warning" %}
This problem does not occur when `enableSelector` is set to `"optimize"`. If possible, we recommend you first attempt to upgrade to the selector API and setting this option.

To make the migration smoother, we've published the following packages:

* [@i18next-selector/codemod](https://github.com/ahrjarrett/i18next-selector/tree/main/packages/codemod)
* [@i18next-selector/vite-plugin](https://github.com/ahrjarrett/i18next-selector/tree/main/packages/vite-plugin)
{% endhint %}

Running typechecking with key validation might result in OOM errors. This can be facilitated by additional factors like:

* large codebase with a lot of namespace with hundreds of keys
* running typechecking alongside other tools like `ESLint` combined with `typescript-eslint`

{% hint style="info" %}
When having this kind of error consider to:

* If you are on a large codebase consider split the typecheck / lint process in separate tasks
* Split the code in multiple packages (monorepo)
*   Use Node `--max-old-space-size` option to increase Node memory

    E.g.:

    ```shell
    export NODE_OPTIONS=\"--max_old_space_size=10240\" && tsc
    ```
{% endhint %}

{% hint style="warning" %}
If you report a OOM error, please provide an easy way to reproduce the issue using:

* online sandbox
* example repository
{% endhint %}

### Not working interpolation values

`t` function infers interpolation values, but it'll only work if the translation files (resources) are placed in a ts file and using `as const` _(like_ [_this_](https://github.com/i18next/i18next/blob/master/examples/typescript/i18n/en/ns1.ts)_)_ or an [interface in a d.ts file](https://github.com/locize/react-i18next-example-app-ts/blob/main/src/%40types/resources.d.ts) _(can be generated like_ [_this_](https://github.com/locize/react-i18next-example-app-ts/blob/751f704984c206076d08638442ae34b3507aa7ad/package.json#L35)_)_, JSON files don't support `as const` to convert objects to be type literals (yet).

### `Type 'HTMLAttributes<T>' is not assignable to type...`

This happens when [`skipLibCheck`](https://www.typescriptlang.org/tsconfig#skipLibCheck) is disabled. Setting `skipLibCheck` in tsconfig to `true` will remove this issue.

### Type error - template literal

{% hint style="info" %}
Note: this problem only occurs when `enableSelector` is set to `false`
{% endhint %}

If you face this issue:

> Argument of type 'string' is not assignable to parameter of type ...

When using the following approach (template literal with an expression):

```typescript
// with i18next
i18next.t(`${expression}.title`);

// with react-i18next
const { t } = useTranslation();
t(`${expression}.title`);
```

Or:

```typescript
// with react-i18next
const { t } = useTranslation(`${ns}Default`);
```

TypeScript will lose the literal value, and it will infer the `key` as string, which will cause to throw the error above. In this case, you will need to assert the template string `as const`, like this:

```typescript
// with i18next
i18next.t(`${expression}.title` as const);

// with react-i18next
const { t } = useTranslation();
t(`${expression}.title` as const);
```

For now, this is the only possible workaround. This is a TypeScript limitation that will be address at some point in the future.

### Type error - excessively deep and possibly infinite

{% hint style="info" %}
Note: this problem does not occur when `enableSelector` is set to `"optimize"`
{% endhint %}

If you face this issue whenever calling the `t` function:

> TS2589: Type instantiation is excessively deep and possibly infinite.

That probably means you did not set up your type declaration correctly, so review your configuration or check [here](https://github.com/i18next/react-i18next/issues?q=is%3Aissue+Type+instantiation+is+excessively+deep+and+possibly+infinite) for some similar cases that may help you. If needed, you can always open an issue on Github to get some help from us.

### Tagged Template Literal (`react-i18next` only)

{% hint style="info" %}
Note: this problem only applies when `enableSelector` is set to `false`
{% endhint %}

If you are using the tagged template literal syntax for the `t` function, like this:

```typescript
t`key1.key2`;
```

The `keys` and `return` type inference will not work, because [TemplateStringsArray](https://github.com/microsoft/TypeScript/issues/33304) does not accept generic types yet. You can use Tagged Template Literal syntax, but it will accept any string as argument.

### Customize `t` function return when `returnObjects` is set to `true` but `CustomTypeOptions.resources` is not used (>= v23)

When no `resources` are defined inside `CustomTypeOptions` and `returnObject` options is set to `true` `t` function returns a `$SpecialObject` type:

```typescript
type $SpecialObject = object | Array<string | object>; 
```

Due to his anatomy it can be easily casted to a better defined type as you can see from the following examples:

#### Example with object

{% tabs %}
{% tab title="v25.4+" %}
```typescript
const tResult = t($ => $.myTypeKey, { returnObjects: true }) as { title: string, text: string };
expectTypeOf(tResult).toEqualTypeOf<{ title: string; text: string }>();
```
{% endtab %}

{% tab title="v25.3 and before" %}
```typescript
const tResult = t('myTypeKey', { returnObjects: true }) as { title: string, text: string };
expectTypeOf(tResult).toEqualTypeOf<{ title: string; text: string }>();
```
{% endtab %}
{% endtabs %}

#### Example with array

{% tabs %}
{% tab title="v25.4+" %}
```typescript
const tResult = t($ => $.myTypeKey, { returnObjects: true }) as Array<string>;
expectTypeOf(tResult).toEqualTypeOf<Array<string>>();
```
{% endtab %}

{% tab title="v25.3 and before" %}
```typescript
const tResult = t('myTypeKey', { returnObjects: true }) as Array<string>;
expectTypeOf(tResult).toEqualTypeOf<Array<string>>();
```
{% endtab %}
{% endtabs %}

#### Example without casting using type parameters

{% tabs %}
{% tab title="v25.4+" %}
```typescript
type MyCustomReturn = { title:string; text: string };
const tResult = t<string, { returnObjects: true }, MyCustomReturn>($ => $.myKey, { returnObjects: true });
expectTypeOf(tResult).toEqualTypeOf<MyCustomReturn>();
```
{% endtab %}

{% tab title="v25.3 and before" %}
```typescript
type MyCustomReturn = { title:string; text: string };
const tResult = t<string, { returnObjects: true }, MyCustomReturn>('myKey', { returnObjects: true });
expectTypeOf(tResult).toEqualTypeOf<MyCustomReturn>();
```
{% endtab %}
{% endtabs %}

## Troubleshooting (< 23)

{% hint style="info" %}
The following problems should not be present since v23.0.0
{% endhint %}

### Slow compilation time

In order to fully type the `t` function, we recursively map all nested keys from your primary locale files or objects. Depending on the number of keys your project have, the compilation time could be noticeably affected. If this is negatively influencing your productivity, this feature might not be the best choice for you. If needed, you can always open an issue on Github to get some help from us.

### Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz

`t` function can return `null`, this behaviour is [set by default](configuration-options.md#translation-defaults), if you want to change it, set `returnNull` type to `false`.

```typescript
// i18next.d.ts
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    ...
  }
}
```

I also recommend updating your [i18next configuration](configuration-options.md) to behave accordantly:

```javascript
i18next.init({
  returnNull: false,
  // ...
});
```
