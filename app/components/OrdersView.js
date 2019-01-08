import { Marionette, App } from '../../vendor/vendor';
import tpl from '../templates/orders.tpl';

var OrderView = Marionette.View.extend({
    template: tpl,
    className: 'table-view-item',
    ui: {
        confirm: '.js-confirm-order-button'
    },
    events: {
        'click @ui.confirm': 'onClickConfirm'
    },

    initialize: function() {
        this.model.set({isOrder: true});
    },

    onClickConfirm: function(evt) {
        var deleteOrder = App.request('delete:order', this.model.get('id'));
        deleteOrder.done(function(response) {
            App.trigger("refresh:view", "orders");
        }).fail(function(response) {
            App.trigger('error:toast:show', response); // TODO Task-01: Make sure this works
        });
    }
});

export default Marionette.CollectionView.extend({
    childView: OrderView,
    className: 'table-view'
});