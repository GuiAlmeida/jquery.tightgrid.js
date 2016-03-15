# jquery.tightgrid.js
_inline-block based grid plugin_

TightGrid is a inline-block based jquery plugin, which places the elements in optimal vertical position keeping original order.

## Demo
Source: https://github.com/vursen/jquery.tightgrid.js/blob/master/demo/grid.html

Demo: http://vursen.github.io/jquery.tightgrid.js/demo/grid.html

![](https://habrastorage.org/files/05c/59b/896/05c59b896398406a81b2182afd905f83.jpg)

## How to use

CSS:
```css
.grid {
  margin: -10px;
}

.grid__item {
  display: inline-block; /* Important */
  vertical-align: top;   /* Important */
  width: 100px;
  margin: 10px;
}
```

Javascript:
```javascript
$(document).ready(function() {
  $('.grid').tightGrid({
    /* options */
  });
});
```

HTML:
```html
<div class="grid">
  <div class="grid__item js-item">1</div>
  <div class="grid__item js-item">2</div>
  <div class="grid__item js-item">3</div>
  <div class="grid__item js-item">4</div>
  <div class="grid__item js-item">5</div>
  <div class="grid__item js-item">6</div>
  <div class="grid__item js-item">7</div>
  <div class="grid__item js-item">8</div>
  <div class="grid__item js-item">9</div>
</div>
```

## Options

**resize**
Rebuild layout on resize event (default: `true`)

**columnWidth**
One unit column width (default: `null`, plugin takes the first item width)

**itemSelector**
Grid item selector (default: `.js-item`)

## Methods

**rebuild**
Rebuild layout. Useful when adding items on the fly.
```javascript
$('.grid').data('tightGrid').rebuild()
```

**destroy**
Destroy grid. This reverts all grid elements back to their original state.
```javascript
$('.grid').data('tightGrid').destroy()
```

## License

TightGrid is released under the [MIT license](http://desandro.mit-license.org).

* * *

Made by Sergey Vinogradov
