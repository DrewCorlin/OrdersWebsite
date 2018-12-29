import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from './global/Entities';
import tpl from '../templates/base.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: "base-view",

    regions: {
        contentRegion: ".js-content-region"
    },

    initialize: function() {
        // Global view-specific events
        App.on('toast:show', this.showToast, this);
        App.on('error:toast:show', this.showErrorToast, this);
    },

    showToast: function(text) {
        toast.success(text);
    },

    showErrorToast: function(text) {
        toast.error(text, "Error");
    }
});
