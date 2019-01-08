var root = 'http://localhost:8080/';

export default {
    order: function() {
        if (this.id) {
            return root + 'order/' + this.id;
        }
        return root + 'orders';
    },
    orders: root + 'orders',
    meal: function() {
        return root + 'meal/' + this.id;
    },
    meals: root + 'meals',
    user: root + 'user'
};