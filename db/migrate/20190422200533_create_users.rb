# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
    enable_extension 'uuid-ossp'

    create_table :users, id: :uuid do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.boolean :terms_of_service, null: false

      t.timestamps
    end
  end
end
