import { Backbone } from '../../../vendor/vendor';
import Urls from "./urls";

var Order = Backbone.Model.extend({
    defaults: {
        label: null,
        customer: null,
        description: null
    },
    url: Urls.order
});

var Orders = Backbone.Collection.extend({
    model: Order,
    url: Urls.orders
});

export default {
    Order,
    Orders
};