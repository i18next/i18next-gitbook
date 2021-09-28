# Interpolation

Interpolation is one of the most used functionalities in I18N. It allows integrating dynamic values into your translations.

Per default, interpolation values get escaped to mitigate XSS attacks.

If the interpolation functionality provided doesn't suit you, you can use [i18next-sprintf-postProcessor](https://github.com/i18next/i18next-sprintf-postProcessor) for sprintf supported interpolation.

## Basic

Interpolation is one of the most used functionalities in I18N.

Keys

Keys, by default, are strings surrounded by curly brackets:

```javascript
{
    "key": "{{what}} is {{how}}"
}
```

Sample

```javascript
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
```

## Working with data models

You can also pass entire data models as a value for interpolation.

Keys

```javascript
{
    "key": "I am {{author.name}}"
}
```

Sample

```javascript
const author = { 
    name: 'Jan',
    github: 'jamuhl'
};
i18next.t('key', { author });
// -> "I am Jan"
```

## Unescape

Per default, the values get escaped to mitigate XSS attacks. You can toggle escaping off, by either putting `-` before the key, or set the `escapeValue` option to `false` when requesting a translation.

Keys

```javascript
{
    "keyEscaped": "no danger {{myVar}}",
    "keyUnescaped": "dangerous {{- myVar}}"
}
```

Sample

```javascript
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"

i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)
```

_Warning:_ If you toggle escaping off, escape any user input yourself!

## Additional options

Prefix/Suffix for interpolation and other options can be overridden in the init options or by passing additional options to the `t` function:

```javascript
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```

| option | default | description |
| :--- | :--- | :--- |
| escape | function | escape function `function escape(str) { return str; }` |
| escapeValue | true | escapes passed in values to avoid XSS injection |
| useRawValueToEscape | false | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking |
| prefix | "{{" | prefix for interpolation |
| suffix | "}}" | suffix for interpolation |

While there are a lot of options going with the defaults should get you covered.

## All interpolation options

<table>
  <thead>
    <tr>
      <th style="text-align:left">option</th>
      <th style="text-align:left">default</th>
      <th style="text-align:left">description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">format</td>
      <td style="text-align:left">noop function</td>
      <td style="text-align:left">format function, read <a href="formatting.md">formatting</a> for details</td>
    </tr>
    <tr>
      <td style="text-align:left">formatSeparator</td>
      <td style="text-align:left">&quot;,&quot;</td>
      <td style="text-align:left">used to separate format from interpolation value</td>
    </tr>
    <tr>
      <td style="text-align:left">escape</td>
      <td style="text-align:left">function</td>
      <td style="text-align:left">escape function <code>function escape(str) { return str; }</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">escapeValue</td>
      <td style="text-align:left">true</td>
      <td style="text-align:left">escape passed in values to avoid XSS injection</td>
    </tr>
    <tr>
      <td style="text-align:left">useRawValueToEscape</td>
      <td style="text-align:left">false</td>
      <td style="text-align:left">If true, then value passed into escape function is not casted to string,
        use with custom escape function that does its own type-checking</td>
    </tr>
    <tr>
      <td style="text-align:left">prefix</td>
      <td style="text-align:left">&quot;{{&quot;</td>
      <td style="text-align:left">prefix for interpolation</td>
    </tr>
    <tr>
      <td style="text-align:left">suffix</td>
      <td style="text-align:left">&quot;}}&quot;</td>
      <td style="text-align:left">suffix for interpolation</td>
    </tr>
    <tr>
      <td style="text-align:left">prefixEscaped</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">escaped prefix for interpolation (regexSafe)</td>
    </tr>
    <tr>
      <td style="text-align:left">suffixEscaped</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">escaped suffix for interpolation (regexSafe)</td>
    </tr>
    <tr>
      <td style="text-align:left">unescapeSuffix</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">suffix to unescaped mode</td>
    </tr>
    <tr>
      <td style="text-align:left">unescapePrefix</td>
      <td style="text-align:left">&quot;-&quot;</td>
      <td style="text-align:left">prefix to unescaped mode</td>
    </tr>
    <tr>
      <td style="text-align:left">nestingPrefix</td>
      <td style="text-align:left">&quot;$t(&quot;</td>
      <td style="text-align:left">prefix for <a href="nesting.md">nesting</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">nestingSuffix</td>
      <td style="text-align:left">&quot;)&quot;</td>
      <td style="text-align:left">suffix for <a href="nesting.md">nesting</a>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">nestingPrefixEscaped</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">escaped prefix for nesting (regexSafe)</td>
    </tr>
    <tr>
      <td style="text-align:left">nestingSuffixEscaped</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">escaped suffix for nesting (regexSafe)</td>
    </tr>
    <tr>
      <td style="text-align:left">nestingOptionsSeparator</td>
      <td style="text-align:left">&quot;,&quot;</td>
      <td style="text-align:left">separates the options from nesting key</td>
    </tr>
    <tr>
      <td style="text-align:left">defaultVariables</td>
      <td style="text-align:left">undefined</td>
      <td style="text-align:left">global variables to use in interpolation replacements <code>defaultVariables: { key: &quot;value&quot; }</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">maxReplaces</td>
      <td style="text-align:left">1000</td>
      <td style="text-align:left">after how many interpolation runs to break out before throwing a stack
        overflow</td>
    </tr>
    <tr>
      <td style="text-align:left">skipOnVariables</td>
      <td style="text-align:left">
        <p>true</p>
        <p></p>
        <p><em>(was false for  &lt;v21.0.0)</em>
        </p>
      </td>
      <td style="text-align:left">
        <p>Will skip to interpolate the variables, example:</p>
        <p><code>t(&apos;key&apos;, { a: &apos;$t(nested)&apos; })</code>
        </p>
        <p>this will not resolve the nested key and will use<code>$t(nested)</code> as
          the variable value.
          <br />Another example:</p>
        <p><code>t(&apos;key&apos;, { a: &apos;{{otherVar}}&apos;: otherVar: &apos;another value&apos; })</code>
        </p>
        <p>this will not resolve the otherVar variable and will use<code>{{otherVar}}</code>as
          the variable value.</p>
        <p><b>If your interpolation variables are user provided or loaded from an external source, we strongly suggest to keep this option to true.</b>
        </p>
        <p><em>If you know what you&apos;re doing, you can also set this to false.</em>
        </p>
      </td>
    </tr>
  </tbody>
</table>

