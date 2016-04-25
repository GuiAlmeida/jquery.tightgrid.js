(function($) {

  class TightGrid {
    constructor($el, options = {}) {
      this.options = options;
      this.$el     = $el;

      this.columnWidth  =
        this.options.columnWidth ||
        this.$el.find(this.options.itemSelector).first().outerWidth(true);

      this.build();

      if (this.options.resize) {
        this.resizeHandler = this.rebuild.bind(this);
        $(window).on('resize', this.resizeHandler);
      }
    }

    build() {
      let colsInRow = Math.floor(this.$el.width() / this.columnWidth);

      let $items = this.$el.find(this.options.itemSelector);

      $items
        .get()
        .reduce((grid, item) => {
          let $item = $(item);
          let cols  = Math.floor($item.outerWidth(true) / this.columnWidth);

          return grid.concat(new Array(cols).fill($item));
        }, [])

        .forEach(($item, i, grid) => {
          if (i <= colsInRow) return;

          let $itemAbove = grid[i - colsInRow];

          let delta =
            $item.offset().top      - parseInt($item.css('margin-bottom')) -
            $itemAbove.offset().top - parseInt($itemAbove.css('margin-bottom')) - $itemAbove.outerHeight()

          $item.css('margin-top', (_, marginTop) => {
            marginTop = parseInt(marginTop);

            console.log(marginTop)

            return marginTop - delta;
            // return marginTop < marginTop - delta ? marginTop - delta : marginTop
          });

        });
    }

    rebuild() {
      this.reset();
      this.build();
    }

    reset() {
      this.$el.find(this.options.itemSelector).css('margin-top', '');
    }

    destroy() {
      this.reset();

      this.options.resize && $(window).off('resize', this.resizeHandler);
    }
  }

  $.fn.tightGrid = function(options = {}) {
    options = $.extend({}, $.fn.tightGrid.defaults, options);

    this.each(function() {
      let $this = $(this);

      if (!$this.data('tightGrid')) {
        $this.data('tightGrid', new TightGrid($this, options));
      }
    });
  }

  $.fn.tightGrid.defaults = {
    itemSelector: '.js-item',
    columnWidth: null,
    resize: true
  }

}(jQuery));
