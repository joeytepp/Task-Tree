# frozen_string_literal: true

class Project < ApplicationRecord
  acts_as_paranoid

  # Tasks relationship
  has_many :tasks, dependent: :delete_all

  # Allowed colors
  enum color: %i[RED GREEN BLUE BLACK PURPLE GREY ORANGE BROWN]

  # Many to many relationship with users
  has_many :project_users
  has_many :users, through: :project_users
end
