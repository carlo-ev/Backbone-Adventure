var TaskItem = Backbone.Model.extend({
  defaults:{ description: 'A new task to do not yet filled'},
  urlRoot: "/tasks",
  changeCompleted: function(){
    this.set("completed", !(this.get("completed")) );
    this.save();
  }
  });

var TaskList = Backbone.Collection.extend({
  model: TaskItem,
    url: '/tasks'
});
