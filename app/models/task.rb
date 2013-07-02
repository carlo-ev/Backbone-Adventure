class Task < ActiveRecord::Base
  attr_accessible :description, :completed
  validates_presence_of :description
  validates :description, :length => {:minimum => 7}
  validates :completed, :inclusion => {:in => [true, false]}
end
