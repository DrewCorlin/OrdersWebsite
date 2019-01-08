import { Marionette, App } from '../../vendor/vendor';
import tpl from '../templates/meals.tpl';

var MealView = Marionette.View.extend({
    template: tpl,
    className: 'table-view-item meal',

    ui: {
        descriptionInput: '.js-description-input',
        selectMealButton: '.js-select-meal-button'
    },

    events: {
        'click @ui.selectMealButton': 'onSelectMeal'
    },

    initialize: function() {
        this.model.set({isOrder: false});
    },

    onSelectMeal: function() {
        var customer = "TEST TEST";
        var description = this.$(this.ui.descriptionInput).val();
        var createOrder = App.request('create:order', this.model.get('label'), customer, description);
        createOrder.done(function(response) {
            App.trigger('toast:show', response); // TODO Task-06: Check why duplicates are created
        }).fail(function(response) {
            App.trigger('error:toast:show', response); // TODO Task-01: Make sure this works
        });
        this.$(this.ui.descriptionInput).val(null);
    }
});

export default Marionette.CollectionView.extend({
    childView: MealView,
    className: 'table-view'
});