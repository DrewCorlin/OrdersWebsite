import { Backbone } from '../../../vendor/vendor';
import Urls from "./urls";

export default {
    Order: Backbone.Model.extend({
        defaults: {
            label: null,
            customer: null,
            description: null
        },
        url: Urls.order
    })
};