var TasksRouter = Backbone.Router.extend({
  routes: {
    "tasks/:id": "show",
    "": "index"
  },
  index: function(){
   this.taskList.fetch(); 
  },
  initialize: function(){
    this.taskList = new TaskList();
    this.taskListView = new TaskListView({collection: this.taskList});
    this.taskItem = new TaskItem();
    this.taskView = new TaskView({model: this.taskItem});
    this.taskFormView = new TaskFormView({collection: this.taskList});
    $(".app").html(this.taskListView.el);
    $(".form").append(this.taskFormView.render().el);
 },
});
