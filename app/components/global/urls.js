var root = 'http://localhost:8080/';

export default {
    order: function(id) {
        return root + 'order/' + id;
    },
    orders: root + 'orders'
};