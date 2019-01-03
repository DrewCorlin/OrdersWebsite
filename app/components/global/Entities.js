import { Backbone } from '../../../vendor/vendor';
import Urls from "./urls";

var User = Backbone.Model.extend({
    defaults: {
        name: null,
        roles: null
    },
    url: Urls.user
});

var Order = Backbone.Model.extend({
    defaults: {
        label: null,
        customer: null,
        description: null,
        id: null
    },
    url: Urls.order
});

var Orders = Backbone.Collection.extend({
    model: Order,
    url: Urls.orders
});

var Meal = Backbone.Model.extend({
    defaults: {
        id: null,
        label: null,
        description: null
    },
    url: Urls.meal,
});

var Meals = Backbone.Collection.extend({
    model: Meal,
    url: Urls.meals
});

// Error is reserved
var ErrorModel = Backbone.Model.extend({
    defaults: {
        message: null
    }
});

export default {
    Order,
    Orders,
    Meal,
    Meals,
    User,
    ErrorModel
};