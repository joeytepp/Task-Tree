# frozen_string_literal: true

class CreateProjectUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :project_users, id: :uuid do |t|
      t.belongs_to :project, index: true, type: :uuid
      t.belongs_to :user, index: true, type: :uuid
      t.timestamps
    end
  end
end
