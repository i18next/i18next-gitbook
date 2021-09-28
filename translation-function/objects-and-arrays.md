# Objects and Arrays

## Objects

You can return objects or arrays to be used by third party modules localization:

keys

```javascript
{
    "tree": {
        "res": "added {{something}}"
    },
    "array": ['a', 'b', 'c']
}
```

sample

```javascript
i18next.t('tree', { returnObjects: true, something: 'gold' });
// -> { res: 'added gold' }

i18next.t('array', { returnObjects: true });
// -> ['a', 'b', 'c']
```

The returned value supports interpolation, plurals, nesting, ...

`returnObjects` can be set to true on init.

## Arrays

You can access array values or join them.

keys

```javascript
{
      "arrayJoin": [
        "line1",
        "line2",
        "line3"
      ],
      "arrayJoinWithInterpolation": [
        "you",
        "can",
        "{{myVar}}"
      ],
      "arrayOfObjects": [
        { "name": "tom" },
        { "name": "steve" }
      ]
}
```

sample

```javascript
i18next.t('arrayJoin', { joinArrays: '+' });
// -> "line1+line2+line3"

i18next.t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' });
// -> "you can interpolate"

i18next.t('arrayOfObjects.0.name');
// -> "tom"
```

The returned value supports interpolation, plurals, nesting, ...

`joinArrays` can be set to a value on init.

