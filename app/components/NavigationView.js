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

    modelEvents: {
        'change activeButton': 'setActiveButton'
    },

    onRender: function() {
        this.model.set({activeButton: this._getDefaultPage()});
    },

    onClickOrders: function() {
        this.model.set({activeButton: this.ui.orders});
        this.triggerMethod('navigation:change', 'orders');
    },

    onClickMeals: function() {
        this.model.set({activeButton: this.ui.meals});
        this.triggerMethod('navigation:change', 'meals');
    },

    onClickAccount: function() {
        this.model.set({activeButton: this.ui.account});
        this.triggerMethod('navigation:change', 'account');
    },

    setActiveButton: function(model) {
        var view = this;
        [this.ui.orders, this.ui.meals, this.ui.account].forEach(function(button) {
            view.$(button).removeClass('btn--active');
        });
        this.$(model.get('activeButton')).addClass('btn--active');
    },

    _getDefaultPage: function() {
        return this.ui.orders; // TODO Task-03: Use roles to determine the appropriate default view
    }
});
