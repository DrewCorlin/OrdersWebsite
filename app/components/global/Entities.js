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
    model: Order
});

export default {
    Order,
    Orders
};