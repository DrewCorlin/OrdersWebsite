import { Marionette, App, _} from '../../vendor/vendor';
import GlobalEvents from './global/GlobalEvents';
import BaseView from './BaseView';
import Entities from './global/Entities';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        window.serverSession = {authToken: null};
        _.each(GlobalEvents.requests, (action, event) => {
            App.reply(event, action);
        });
        _.each(GlobalEvents.triggers, (action, event) => {
            App.on(event, action);
        });
        var user = new Entities.User({name: 'Drew C', roles: ['1', '2']});
        this.showView(new BaseView({model: user}));
    }
});
