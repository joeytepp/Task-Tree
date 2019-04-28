# frozen_string_literal: true

class Task < ApplicationRecord
  acts_as_paranoid
  belongs_to :project
end
