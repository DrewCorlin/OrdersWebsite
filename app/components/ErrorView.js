import { Marionette, _ } from '../../vendor/vendor';

export default Marionette.View.extend({
    template: _.template("<div> <%- message %> </div>"),
    className: "error-view"
});
