// Global events - Kept in the same file to allow lint to detect duplicate keys
// For now group like requests together to allow separation later
// TODO: Find a better way to separate these
import Entities from './Entities';
import { _, App } from  '../../../vendor/vendor';

var Order = {
    fetch: function() {
        var order = new Entities.Orders();
        var defer = $.Deferred();
        order.fetch().done(function(orders) {
            defer.resolve(orders);
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
        }
    },
    // No return expected
    triggers: {}
};