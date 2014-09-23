/**
 * Button spinner
 *
 * @jquey
 * @font awsome
 * @bootstrap
 *
 *
 *
 * @param {Object} $
 */

(function($) {
    var actions = ['play', 'pause', 'stop'];
    var spinnerHTML = '<span><i class="fa fa-spinner"></i> ... Saving<span>';
    $.fn.spinButton = function(action) {
        if (actions.indexOf(action) < 0)
            return;
        if (!this._has_spinnser) {
            this._has_spinnser = true;
            this.$spinner = $(spinnerHTML).appendTo(this).hide();
            this._has_spinnser = true;
        }
        var $this = $(this);
        switch (action) {
            case 'play' :
                $this.children().hide();
                this.$spinner.show();
                break;
            case 'stop' :
            case 'pause' :
                $this.children().show();
                this.$spinner.hide();
                break;
        }
    };
    $.spinButton = {
        defaults : NaN
    };
})(jQuery);
