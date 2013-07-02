class TasksController < ApplicationController
  respond_to :json

  def index
    @tasks = Task.all
    respond_with @tasks, :status => :ok
  end

  def show
    @task = Task.find(params[:id])
    respond_with @task, :status => :created
  end

  def create 
    @task = Task.new(params[:task])
    if @task.save
      respond_with @task, :status => :created
    else
      respond_with :errors => @task.errors.full_messages, :status => :bad_request
    end
  end

  def update 
    @task = Task.find(params[:id])
    if @task.update_attributes(params[:task])
      respond_with @task, :status => :accepted
    else
      respond_with :errors => @task.errors.fullmessages, :status => :not_modified
    end
  end

  def destroy 
    @task = Task.find(params[:id])
    if @task.try(:destroy)
      respond_with :status => :ok
    else
      respond_with :status => :conflict
    end
  end 


end
