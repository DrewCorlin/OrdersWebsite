var root = 'http://localhost:8080/';

export default {
    order: function() {
        return root + 'order/' + this.id;
    },
    orders: root + 'orders',
    meal: function() {
        return root + 'meal/' + this.id;
    },
    meals: root + 'meals',
    user: root + 'user'
};