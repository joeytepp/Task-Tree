# frozen_string_literal: true

class Task < ApplicationRecord
  acts_as_paranoid

  # Project relationship
  belongs_to :project

  # Parent child relationship
  has_many :children, class_name: :Task, foreign_key: :parent_id
  belongs_to :parent, class_name: :Task, foreign_key: :parent_id, required: false

  # Relationship to root tasks
  has_one :root, class_name: :Task, foreign_key: :root_id

  def root?
    root_id.nil? && parent_id.nil?
  end
end
