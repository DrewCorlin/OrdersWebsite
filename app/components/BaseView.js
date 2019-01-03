import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from './global/Entities';
import ChefView from './ChefView';
import OrdersView from './OrdersView';
import ErrorView from './ErrorView';
import NavigationView from './NavigationView';
import tpl from '../templates/base.tpl';
// make orders view, meals view and account view
// remove chef view and customer view
export default Marionette.View.extend({
    template: tpl,
    className: "base-view",

    regions: {
        navigationRegion: ".js-navigation-region",
        contentRegion: ".js-content-region"
    },

    modelEvents: {
        'change viewType': 'onViewTypeChange'
    },

    initialize: function() {
        App.on('toast:show', this.showToast, this);
        App.on('error:toast:show', this.showErrorToast, this);
        this.model.set('isChef', true); // TODO: Update this to use the role
        this.onViewTypeChange();
    },

    onRender: function() {
        this.showChildView('navigationRegion', new NavigationView({model: this.model}));
        // var view = this.model.get('isChef') ? new ChefView() : new CustomerView();
        var view = new ChefView();
        this.showChildView('contentRegion', view);
    },

    showToast: function(text) {
        toast.success(text);
    },

    showErrorToast: function(text) {
        toast.error(text, "Error");
    },

    onChildviewNavigationChange: function(viewType) {
        this.model.set({viewType});
    },

    onViewTypeChange: function() {
        var view = this;
        var viewType = this.model.get('viewType') || "orders"; // Default to orders for now
        if (viewType === "orders") {
            var orderFetch = App.request('fetch:orders');
            orderFetch.done(function(orders) {
                view.showChildView('contentRegion', new OrdersView({collection: new Entities.Orders(orders)}));
            }).fail(function(response) {
                view.showChildView('contentRegion', new ErrorView({
                    model: new Entities.ErrorModel({message: response.responseText})
                }));
            });
        } else if (viewType === "meals") {
            console.log('meals');
        } else {
            console.log('account');
        }
    }
});
