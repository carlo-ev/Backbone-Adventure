//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.TaskApp = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  init: function(){
    window.router = new TasksRouter();
    Backbone.history.start({pushState: true});
  }
};

$(document).ready(function(){
  TaskApp.init();
});
