# Best Practices

> This content is available to you thanks to the contribution of following people:\
> \
>
>
> * [Jenny Reid](https://github.com/jennylreid)

### Impact of Interpolation on localization

When translating into other languages interpolation causes real problems. Fundamentally what interpolation does is concatenate pieces of text. English sentences split into sentence fragments and programmatcially constructed at runtime are difficult and sometimes impossible to translate, unless you have implemented multilingual grammar rules, which is rare.

Use interpolation sparingly to minimize impact on localization. Interpolation cannot be avoided for values that can only be known at runtime, such as

* Time stamps
* User-inputted data

{% hint style="info" %}
When values are known and available for translation in a resource file, interpolation should be avoided. Use multiple self-contained string values instead.
{% endhint %}

#### Example

Suppose you want to use interpolation to replace the value for `{paymentType}` in the following key

```
{
    "key": "All fees will be charged to the {{paymentType}} on file for this account."
}
```

wherein `{paymentType}` could be 'credit card' or 'PayPal account'.

In German the spelling of the word "the" preceding `{paymentType}` must change depending on which value is passed.

```
{
    "key": "Alle Beträge werden dem {{paymentType}} für dieses Konto in Rechnung gestellt."
}
```

The result is some runtime strings will be broken

// -> "Alle Beträge werden dem Kreditkarte für dieses Konto in Rechnung gestellt." <- 'dem Kreditkarte' should be 'der Kreditkarte'

// -> "Alle Beträge werden dem PayPal-Konto für dieses Konto in Rechnung gestellt." <- 'dem PayPal-Konto' is correct

This is just one simple example of a very complex localization problem.

Use two separate fully self-contained strings instead:

```
{
    "key1": "All fees will be charged to the credit card on file for this account."
    "key2": "All fees will be charged to the PayPal account on file for this account."

}
```
