class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from ActiveRecord::RecordNotFound do |err|
    render :json => {:errors => err.message}, :status => :not_found
  end

  def error404
    render :json => {:errors => "The page /#{params[:path]} does not exist"}, :status => :not_found
  end

  def index
  end

end
