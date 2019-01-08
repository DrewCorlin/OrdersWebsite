import { Marionette, App, toast } from '../../vendor/vendor';
import Entities from './global/Entities';
import OrdersView from './OrdersView';
import MealsView from './MealsView';
import ErrorView from './ErrorView';
import NavigationView from './NavigationView';
import tpl from '../templates/base.tpl';

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
        this.model.set('viewType', 'orders'); // TODO Task-03: Use role to determine default view, chef: orders, customer: meals
    },

    onRender: function() {
        this.showChildView('navigationRegion', new NavigationView({model: this.model}));
    },

    showToast: text => {
        toast.success(text);
    },

    showErrorToast: text => {
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
                mealFetch.done(meals => {
                    view.showChildView('contentRegion', new MealsView({collection: meals}));
                }).fail(response => {
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
                orderFetch.done(orders => {
                    view.showChildView('contentRegion', new OrdersView({collection: orders}));
                }).fail(response => {
                    view.showChildView('contentRegion', new ErrorView({
                        model: new Entities.ErrorModel({message: response.responseText})
                    }));
                });
                setTimeout(() => {
                    if (view.model.get('viewType') !== "orders") { return; } // dont refresh if tab has switched
                    view.refreshView();
                }, 60000); // TODO Task-10: Stop this from queuing too many refreshes
        }
    },

    refreshView: function(viewType) {
        var type = viewType || this.model.get('viewType');
        this.model.set({viewType: type}, {silent: true}); // silent since we force refresh below
        this.onViewTypeChange();
    }
});
