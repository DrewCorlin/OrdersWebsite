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
        var view = this;
        var orderFetch = App.request('fetch:orders');
        orderFetch.done(function(orders) {
            view.showChildView('contentRegion', new ChefView({
                orders: new Entities.Orders(orders)
            }));
        }).fail(function(response) {
            console.log("fail", response); // TODO: Error view
        });
    },

    showToast: function(text) {
        toast.success(text);
    },

    showErrorToast: function(text) {
        toast.error(text, "Error");
    }
});
