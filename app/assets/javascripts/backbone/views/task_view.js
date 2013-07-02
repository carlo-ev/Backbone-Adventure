var TaskView = Backbone.View.extend({
  tagName: "tr",
  initialize: function(){
    this.model.on('sync', this.render, this);
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
    this.model.on('hide', this.remove, this);
  },
    template: _.template('<td><input type=checkbox ' + '<% if(completed) print("checked") %>' 
                + '/>' 
                + '</td><td><h5><%= description %></h5></td>'
                + '<td><i class="icon-trash"></i></td>'),
  render: function(){
    this.setClass();
    this.$el.html(this.template(this.model.toJSON()));
    return this; 
  },
  remove: function(){
    this.$el.remove();
  },
  events: {
    "click td input": "changeCompleted",
    "click .icon-trash" : "destroy"
  },
  changeCompleted: function(){
    this.model.changeCompleted();
  },
  destroy: function(){
    this.model.destroy();
  },
  setClass: function(){
    this.$el.attr('class', (this.model.get('completed') ? "success" : "error") );
  },
});

var TaskListView = Backbone.View.extend({
  tagName: "table",
  className: "table table-striped table-hover",
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('remove', this.hideModel);
  },
  render: function(){
    this.addAll();
  },
  addOne: function(taskItem){
    var taskView = new TaskView({model: taskItem});
    this.$el.append(taskView.render().el);
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },
  hideModel: function(model){
    model.trigger('hide');
  }
});

var TaskFormView = Backbone.View.extend({
  tagName: "div",
  className: "span4 offset4",
  events: {
    "click button" : "createTask"
  },
  render: function(){
    this.$el.append( '<div class="span6 offset2"><label type="text" for="TkDescription">New Task: </label>'
        + '<input type="text" class="input-medium" placeholder="Task Description" id="TkDescription"> </div>'
        + '<button class="btn btn-success">Create!</button>'
      );
    return this;
  },
  createTask: function(){
    var desc = $("#TkDescription");
    var item = new TaskItem({
      description: desc[0].value,
      completed: false
    });
    item.save();
    this.collection.add(item);
    desc[0].value = '';
  }
});

