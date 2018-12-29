import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from './global/Entities';
import ChefView from './ChefView';
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

    onRender: function() {
        this.showChildView('contentRegion', new ChefView({
            orders: new Entities.Orders([
                {id: "1", label: "Chicken"},
                {id: "2", label: "Salmon"}
            ])
        }));
    },

    showToast: function(text) {
        toast.success(text);
    },

    showErrorToast: function(text) {
        toast.error(text, "Error");
    }
});
