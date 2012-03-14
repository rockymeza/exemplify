# Exemplify.js, a simple demo tool

The purpose of Exemplify is to make it easier to write examples for JavaScript
libraries or tools that you wish to show off.  It tries to help you avoid code
duplication by taking the source code of the working demo that you have and
displaying the HTML, JavaScript, and CSS to the user.

Imagine you have written an awesome jQuery plugin that does x and is called
`something`.  On your examples page, you could have an example of how to use
`something`'s most basic features.

If you wrote your HTML something like the following with a container element and
an example element inside of it,

```html
<article class="exemplify">
  <h1>The most basic things</h1>

  <div class="example">
    <p class="my_p"></p>

    <script>
    $('.my_p').awesome();
    </script>
  </div>
</article>
```

and then you run the following JavaScript:

```javascript
exemplify.init();
```

Exemplify will turn it into something like this:

```html
<article class="exemplify">
  <h1>The most basic things</h1>

  <div class="example">
    <p class="my_p"></p>

    <script>
    $('.my_p').awesome();
    </script>
  </div>
  <div class="source">
    <h2>HTML:</h2>
    <pre>
      <p class="my_p"></p>
    </pre>
    
    <h2>JavaScript:</h2>
    <pre>
      $('.my_p').awesome();
    </pre>
  </div>
</article>
```

## Using Exemplify
Exemplify depends on jQuery for DOM manipulation.  It exposes a couple of
functions:

`exemplify.init([selector])`
:   This is the most basic way to use Exemplify.  It will *exemplify* all
    containers matching the `exemplify` class.  You may optionally tell `init`
    to *exemplify* other containers by giving it any jQuery-able object (i.e. a
    selector or an HTML element).

`exemplify.exemplify(container)`
:   This is the actual function that takes a container, extracts the source code
    from it, and displays the source code.  If you only wish to *exemplify* one
    object, this is a method you could use.

`$.fn.exemplify()`
:   Exemplify provides a jQuery plugin.  It is used internally, but I am still
    unsure of the preferred invocation method, so it is made available.  You do
    not have to use it.

`exemplify.wrapCode(code, [css_class])`
:   This function is made available in case you need to override how the source
    code is displayed.  The default behavior is to simply stick the code into a
    `pre` element and optionally attach a class to that.


## Contributing to Exemplify
Please feel free to fork and add features/fix some bugs.

## TODO
- Allow customization of the labels (HTML, JS, ...).
- Unify the JavaScript and CSS wrapping code, it is not very DRY.
- Determine if the `exemplify.init` function is even useful, or if Exemplify
  should just be a jQuery plugin.
- Test in other browsers
