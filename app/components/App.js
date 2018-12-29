import { Marionette, App, _} from '../../vendor/vendor';
import GlobalEvents from './global/GlobalEvents';
import BaseView from './BaseView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        window.serverSession = {authToken: null};
        _.each(GlobalEvents.requests, function(action, event) {
            App.reply(event, action);
        });
        _.each(GlobalEvents.triggers, function(action, event) {
            App.on(event, action);
        });
        this.showView(new BaseView());
    }
});
