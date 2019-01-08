// Global events - Kept in the same file to allow lint to detect duplicate keys
// For now group like requests together to allow separation later
// TODO Task-02: Find a better way to separate these
import Entities from './Entities';
import { _ } from  '../../../vendor/vendor';

var Order = {
    fetch: function() {
        var ordersFetcher = new Entities.Orders();
        var defer = $.Deferred();
        ordersFetcher.fetch().done(function(orders) {
            var ordersCollection = new Entities.Orders(orders);
            defer.resolve(ordersCollection);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    },
    delete: function(id) {
        var order = new Entities.Order({id});
        var defer = $.Deferred();
        order.destroy({dataType: "text"}).done(function(response) { //TODO Task-05: Make this not send OPTIONS request
            defer.resolve(response);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    },
    create: function(label, customer, description) {
        var order = new Entities.Order({label, customer, description});
        var defer = $.Deferred();
        order.save(null, {dataType: "text"}).done(function(response) {
            defer.resolve(response);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    }
};

var Meal = {
    fetch: function() {
        var mealsFetcher = new Entities.Meals();
        var defer = $.Deferred();
        mealsFetcher.fetch().done(function(meals) {
            var mealsCollection = new Entities.Meals(meals);
            defer.resolve(mealsCollection);
        }).fail(function(response) {
            defer.reject(response);
        });
        return defer.promise();
    }
};

export default {
    // Expects return from requester
    requests: {
        'cookie:map': function(cookieString) {
            var cookies = cookieString.split('; ');
            var cookieMap = {};
            _.each(cookies, function(cookie) {
                var cur = cookie.split('=');
                cookieMap[cur[0]] = cur[1];
            });
            return cookieMap;
        },
        'cookie:string': function(cookieString) {
            var expiration = new Date();
            expiration.setTime(expiration.getTime() + 2592000); // 30 days, to match backend authToken peristance
            return cookieString + ' expires=' + expiration.toUTCString() + ';';
        },
        'fetch:orders': function() {
            return Order.fetch();
        },
        'delete:order': function(id) {
            return Order.delete(id);
        },
        'create:order': function(label, customer, description) {
            return Order.create(label, customer, description);
        },
        'fetch:meals': function() {
            return Meal.fetch();
        }
    },
    // No return expected
    triggers: {}
};