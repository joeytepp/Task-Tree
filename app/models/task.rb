# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :task, foreign_key: :parent_id
  belongs_to :task, foreign_key: :root_id
  blongs_to :project
end
