# frozen_string_literal: true

class CreateProjectUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :project_users, id: :uuid do |t|
      t.uuid :project_id, index: true, foreign_key: true
      t.uuid :user_id, index: true, foreign_key: true
      t.timestamps
    end
  end
end
