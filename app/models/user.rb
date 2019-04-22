# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
  validates_inclusion_of :terms_of_service, in: [true]

  def full_name
    "#{first_name} #{last_name}"
  end
end
