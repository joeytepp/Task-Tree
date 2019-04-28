# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks, id: :uuid do |t|
      t.text :name, null: false
      t.boolean :completed, null: false
      t.belongs_to :project, type: :uuid
      t.references :parent, type: :uuid, null: true, index: false, foreign_key: { to_table: :tasks }
      t.references :root, type: :uuid, null: true, index: false, foreign_key: { to_table: :tasks }
      t.datetime :deleted_at, index: true
      t.timestamps
    end
  end
end
