import { Marionette, App } from '../../vendor/vendor';
import tpl from '../templates/meals.tpl';
import mealTpl from '../templates/meal.tpl';

var MealView = Marionette.View.extend({
    template: mealTpl,
    className: 'table-view-item meal',

    ui: {
        descriptionInput: '.js-description-input',
        selectMealButton: '.js-select-meal-button',
        deleteMealButton: '.js-delete-meal-button',
        confirmDeleteMealButton: '.js-confirm-delete-meal-button',
        textContainer: '.js-text-container',
        closeModal: '.js-modal-close'
    },

    events: {
        'click @ui.selectMealButton': 'onSelectMeal',
        'click @ui.deleteMealButton': 'onDeleteMeal',
        'click @ui.confirmDeleteMealButton': 'onConfirmDeleteMeal',
        'click @ui.textContainer': 'onClickText',
        'click @ui.closeModal': 'onModalClose'
    },

    serializeData: function() {
        var data = this.serializeModel();
        data.createOrderModalTitle = "Place Order";
        data.deleteMealModalTitle = "Are you sure you want to delete this meal?";
        return data;
    },

    onSelectMeal: function() {
        var customer = "TEST TEST";
        var description = this.$(this.ui.descriptionInput).val();
        var createOrder = App.request('create:order', this.model.get('label'), customer, description);
        createOrder.done(response => {
            App.trigger('toast:show', response); // TODO Task-06: Check why duplicates are created
        }).fail(response => {
            App.trigger('error:toast:show', response);
        });
        this.$(this.ui.descriptionInput).val(null);
        this.onModalClose();
    },

    onDeleteMeal: function() {
        this.$('.js-delete-meal-modal').fadeIn(150);
    },

    onConfirmDeleteMeal: function() {
        var deleteOrder = App.request('delete:meal', this.model.get('id'));
        deleteOrder.done(response => {
            App.trigger('toast:show', response);
            App.trigger('refresh:view');
        }).fail(response => {
            App.trigger('error:toast:show', response);
        });
        this.onModalClose();
    },

    onClickText: function() {
        this.$('.js-create-order-modal').fadeIn(150);
    },

    onModalClose: function() {
        this.$('.js-create-order-modal').fadeOut(150);
        this.$('.js-delete-meal-modal').fadeOut(150);
    }
});

// TODO Task-08: Use a modal to collect the data for creating a meal
export default Marionette.CompositeView.extend({
    template: tpl, // TODO Task-07: Use a more low profile div with a plus sign rather than a button
    childView: MealView,
    className: 'table-view',

    ui: {
        createMeal: '.js-create-meal-button',
        labelInput: '.js-label-input',
        descriptionInput: '.js-description-input'
    },

    events: {
        'click @ui.createMeal': 'onClickCreateMeal'
    },

    onClickCreateMeal: function() {
        var label = this.$(this.ui.labelInput).val();
        var description = this.$(this.ui.descriptionInput).val();
        var createMeal = App.request('create:meal', label, description);
        createMeal.done(response => {
            App.trigger('toast:show', response);
            App.trigger('refresh:view');
        }).fail(response => {
            App.trigger('error:toast:show', response);
        });
    }
});