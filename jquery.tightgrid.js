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
      const colsInRow = Math.floor(this.$el.width() / this.columnWidth);

      const $items = this.$el.find(this.options.itemSelector);

      $items.get().reduce((matrix, item, i) => {
        let $item = $(item);

        if (i >= colsInRow) {
          const delta = $item.offset().top - matrix[i - colsInRow];
          //parseInt($item.css('margin-bottom'))
          if (delta) { $item.css('margin-top', -delta ) }
        }

        let bottom = $item.offset().top + $item.outerHeight();
        let cols   = Math.floor($item.outerWidth(true) / this.columnWidth);
        // for(let j = 0; j < cols; j++) { $items.push($item) };

        return matrix.concat([bottom])
      }, []);
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
