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
        if (this.id) {
            return root + 'meal/' + this.id;
        }
        return root + 'meals';
    },
    meals: root + 'meals',
    user: root + 'user'
};