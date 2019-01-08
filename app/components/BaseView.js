import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from './global/Entities';
import OrdersView from './OrdersView';
import MealsView from './MealsView';
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
        App.on('refresh:view', this.refreshView, this);
        this.model.set('viewType', 'orders'); // Default to orders for now
        this.onViewTypeChange();
    },

    onRender: function() {
        this.showChildView('navigationRegion', new NavigationView({model: this.model}));
    },

    showToast: function(text) {
        console.log('showing toast', text);
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
        switch (this.model.get('viewType')) {
            case 'meals':
                var mealFetch = App.request('fetch:meals');
                mealFetch.done(function(meals) {
                    view.showChildView('contentRegion', new MealsView({collection: meals}));
                }).fail(function(response) {
                    view.showChildView('contentRegion', new ErrorView({
                        model: new Entities.ErrorModel({message: response.responseText})
                    }));
                });
                break;
            case 'account':
                console.log('account');
                break;
            default:
                var orderFetch = App.request('fetch:orders');
                orderFetch.done(function(orders) {
                    view.showChildView('contentRegion', new OrdersView({collection: orders}));
                }).fail(function(response) {
                    view.showChildView('contentRegion', new ErrorView({
                        model: new Entities.ErrorModel({message: response.responseText})
                    }));
                });
                setTimeout(function() {
                    if (view.model.get('viewType') !== "orders") { return; }// dont refresh if tab has switched
                    view.refreshView();
                }, 5000);
        }
    },

    refreshView: function(viewType) {
        var type = viewType || this.model.get('viewType');
        this.model.set({viewType: type});
        this.onViewTypeChange();
    }
});
