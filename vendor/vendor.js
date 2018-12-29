import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import _ from  'underscore';
import $ from 'jquery';
import toast from 'toastr';
Backbone.$ = $;
window.$ = $;
var App = Radio.channel('app');

export { _, $, Backbone, Marionette, App, toast };