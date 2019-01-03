import { Marionette, } from '../../vendor/vendor';
import tpl from '../templates/navigation.tpl';

export default Marionette.View.extend({
    template: tpl,
    className: 'navigation-view',
    ui: {
        orders: '.js-orders-button',
        meals: '.js-meals-button',
        account: '.js-account-button'
    },
    events: {
        'click @ui.orders': 'onClickOrders',
        'click @ui.meals': 'onClickMeals',
        'click @ui.account': 'onClickAccount'
    },
    initialize: function() {
        console.log('nav', this.model);
    },

    onClickOrders: function() {
        this.triggerMethod('navigation:change', 'orders');
    },

    onClickMeals: function() {
        this.triggerMethod('navigation:change', 'meals');
    },

    onClickAccount: function() {
        this.triggerMethod('navigation:change', 'account');
    }
});
