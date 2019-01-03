import { Marionette, App } from '../../vendor/vendor';
import ordersTpl from '../templates/orders-view.tpl';

var OrderView = Marionette.View.extend({
    template: ordersTpl,
    className: 'order-view',
    ui: {
        confirm: '.js-confirm-order-button'
    },
    events: {
        'click @ui.confirm': 'onClickConfirm'
    },

    initialize: function() {
        console.log(this.model);
    },

    onClickConfirm: function(evt) {
        var deleteOrder = App.request('delete:order', this.model.get('id'));
        deleteOrder.done(function(response) {
            console.log('deleted', response);
        }).fail(function(response) {
            console.log('failed', response);
        });
    }
});

export default Marionette.CollectionView.extend({
    initialize: function() {
        console.log(this.collection);
    },
    childView: OrderView
});