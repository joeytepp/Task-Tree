# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :project_users, foreign_key: :user_id
  has_many :projects, through: :project_users

  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
  validates_inclusion_of :terms_of_service, in: [true]

  def full_name
    "#{first_name} #{last_name}"
  end
end
