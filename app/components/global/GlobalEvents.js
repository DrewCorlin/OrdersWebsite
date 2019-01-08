// Global events - Kept in the same file to allow lint to detect duplicate keys
// For now group like requests together to allow separation later
// TODO Task-02: Find a better way to separate these
import Entities from './Entities';
import { _ } from  '../../../vendor/vendor';

var Order = {
    fetch: () => {
        var ordersFetcher = new Entities.Orders();
        var defer = $.Deferred();
        ordersFetcher.fetch().done(orders => {
            var ordersCollection = new Entities.Orders(orders);
            defer.resolve(ordersCollection);
        }).fail(response => {
            defer.reject(response);
        });
        return defer.promise();
    },
    delete: id => {
        var order = new Entities.Order({id});
        var defer = $.Deferred();
        order.destroy({dataType: 'text'}).done(response => { //TODO Task-05: Look into this sending OPTIONS request
            defer.resolve(response);
        }).fail(response => {
            defer.reject(response);
        });
        return defer.promise();
    },
    create: (label, customer, description) => {
        var order = new Entities.Order({label, customer, description});
        var defer = $.Deferred();
        order.save(null, {dataType: 'text'}).done(response => {
            defer.resolve(response);
        }).fail(response => {
            if (response.responseText) {
                defer.reject(JSON.parse(response.responseText).message);
            } else {
                defer.reject(response);
            }
        });
        return defer.promise();
    }
};

var Meal = {
    fetch: () => {
        var mealsFetcher = new Entities.Meals();
        var defer = $.Deferred();
        mealsFetcher.fetch().done(meals => {
            var mealsCollection = new Entities.Meals(meals);
            defer.resolve(mealsCollection);
        }).fail(response => {
            defer.reject(response);
        });
        return defer.promise();
    },
    create: (label, description) => {
        var meal = new Entities.Meal({label, description});
        var defer = $.Deferred();
        meal.save(null, {dataType: 'text'}).done(response => {
            defer.resolve(response);
        }).fail(response => {
            if (response.responseText) {
                defer.reject(JSON.parse(response.responseText).message);
            } else {
                defer.reject(response);
            }
        });
        return defer.promise();
    },
    delete: id => {
        var meal = new Entities.Meal({id});
        var defer = $.Deferred();
        meal.destroy({dataType: 'text'}).done(response => {
            defer.resolve(response);
        }).fail(response => {
            defer.reject(response);
        });
        return defer.promise();
    }
};

export default {
    // Expects return from requester
    requests: {
        'cookie:map': cookieString => {
            var cookies = cookieString.split('; ');
            var cookieMap = {};
            _.each(cookies, cookie => {
                var cur = cookie.split('=');
                cookieMap[cur[0]] = cur[1];
            });
            return cookieMap;
        },
        'cookie:string': cookieString => {
            var expiration = new Date();
            expiration.setTime(expiration.getTime() + 2592000); // 30 days, to match backend authToken peristance
            return cookieString + ' expires=' + expiration.toUTCString() + ';';
        },
        'fetch:orders': () => {
            return Order.fetch();
        },
        'delete:order': id => {
            return Order.delete(id);
        },
        'create:order': (label, customer, description) => {
            return Order.create(label, customer, description);
        },
        'fetch:meals': () => {
            return Meal.fetch();
        },
        'create:meal': (label, description) => {
            return Meal.create(label, description);
        },
        'delete:meal': id => {
            return Meal.delete(id);
        }
    },
    // No return expected
    triggers: {}
};