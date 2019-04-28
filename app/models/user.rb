# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  # Many to many relationship with projects
  has_many :project_users
  has_many :projects, through: :project_users

  # Validation
  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
  validates_inclusion_of :terms_of_service, in: [true]

  # Returns the full name of a user
  def full_name
    "#{first_name} #{last_name}"
  end
end
