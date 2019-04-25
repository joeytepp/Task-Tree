# frozen_string_literal: true

class Project < ApplicationRecord
  acts_as_paranoid

  enum color: %i[RED GREEN BLUE BLACK PURPLE GREY ORANGE BROWN]

  has_many :project_users
  has_many :users, through: :project_users
end
