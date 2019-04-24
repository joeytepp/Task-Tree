# frozen_string_literal: true

class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects, id: :uuid do |t|
      t.string :name, null: false
      t.string :color, null: false, default: :RED
      t.integer :position, null: false, default: 0
      t.datetime :deleted_at, index: true
      t.timestamps
    end
  end
end
