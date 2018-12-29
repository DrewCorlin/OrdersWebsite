import { Marionette } from '../../vendor/vendor';
// import Entities from './global/Entities';
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
        this.triggerMethod("confirm:order", this.model.get('id'));
    }
});

var OrdersView = Marionette.CollectionView.extend({
    childView: OrderView,
    onChildviewConfirmOrder: function(id) {
        console.log(id);
    }
});

export default Marionette.View.extend({
    template: tpl,
    className: "chef-view",
    regions: {
        ordersRegion: ".js-orders-region",
        mealsRegion: ".js-meals-region"
    },

    onRender: function() {
        var view = new OrdersView({collection: this.options.orders});
        this.showChildView('ordersRegion', view);
    }
});
