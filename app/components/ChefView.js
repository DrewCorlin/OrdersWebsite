import { Marionette, App } from '../../vendor/vendor';
import Entities from './global/Entities';
import ErrorView from './ErrorView';
import tpl from '../templates/chef-view.tpl';
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
    onClickConfirm: function(evt) {
        var deleteOrder = App.request('delete:order', this.model.get('id'));
        deleteOrder.done(function(response) {
            console.log('deleted', response);
        }).fail(function(response) {
            console.log('failed', response);
        });
    }
});

var OrdersView = Marionette.CollectionView.extend({
    childView: OrderView
});

export default Marionette.View.extend({
    template: tpl,
    className: "chef-view",
    regions: {
        contentRegion: ".js-content-region"
    },

    onRender: function() {
        // var orderFetch = App.request('fetch:orders');
        // orderFetch.done(function(orders) {
        //     view.showChildView('contentRegion', new OrdersView(orders));
        // }).fail(function(response) {
        //     view.showChildView('contentRegion', new ErrorView({
        //         model: new Entities.ErrorModel({message: response.responseText})
        //     }));
        // });

        // var view = new OrdersView({collection: this.options.orders});
        // this.showChildView('ordersRegion', view);
    }
});
