// Exemplify.js, a simple demo tool
// by Rocky Meza
//
// The purpose of this tool is to make writing examples easy and to avoid code
// duplication.
//
// The easiest way to use Exemplify is to run `$('.exemplify').exemplify();` at
// the bottom of your page.  This will look for all containers with the class
// `exemplify`.  It will display the source code in each container if it
// contains an element with the class `example`.
//
// Exemplify depends on jQuery.
;(function(exports, $){
  var ex = exports.exemplify = {}

    // The `_glue` function simply ignores the first argument and passes the
    // second in to `exemplify.exemplify`.  This is used in the jQuery plugin
    // to ignore the `index` argument passed in by `each`.
    , _glue = function(_, container) {
        ex.exemplify(container);
      }
    ;

  // `exemplify.exemplify` takes a container element and searches inside of it
  // for an element that has the `.example` class on it.  It extracts the
  // JavaScript, CSS, and HTML out of the example and tacks on another element
  // that has the source code after the example element.
  ex.exemplify = function(container) {
    var $example = $('.example', container)
      , example  = $example[0]

      // you can't extract the source out of an external script, so just treat
      // it like HTML
      , $scripts = $('script:not([src])', $example).remove()

      // we remove the CSS so that it doesn't show up in the HTML
      , $styles  = $('style', $example).remove()

      , html     = $example.html()
      
      // just use the same type of element that the example was
      , $source  = $(document.createElement(example.tagName))
      ;

    // we need to put the CSS back in because otherwise it won't be applied.
    $example.append($styles);

    if ( html ) {
      $source
        .append('<h2>HTML:</h2>')
        .append(ex.wrapCode(html, 'html'));
    }

    if ( $scripts.length ) {
      $source.append('<h2>JavaScript:</h2>');
      $scripts.each(function() {
        $source.append(ex.wrapCode($(this).text(), 'javascript'));
      });
    }

    if ( $styles.length ) {
      $source.append('<h2>CSS:</h2>');
      $styles.each(function() {
        $source.append(ex.wrapCode($(this).text(), 'css'));
      });
    }

    $example.after($source);
  };

  // `wrapCode` is used to take source code from the sample and put it into the
  // human visible format.  It is exposed so that it may be overridden.  The
  // default behavior is to wrap the code in a `pre` tag that optionally has a
  // class on it.
  ex.wrapCode = function(code, css_class) {
    return $('<pre />')
      .addClass(css_class)
      .text(code.trim());
  };

  // Here is the jQuery plugin.  You do not have to use this.
  $.fn.exemplify = function() {
    this.each(_glue);
  };

})(this, jQuery);
