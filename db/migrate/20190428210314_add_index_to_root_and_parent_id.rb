class AddIndexToRootAndParentId < ActiveRecord::Migration[5.2]
  def change
    add_index :tasks, [:root_id, :parent_id]
  end
end
