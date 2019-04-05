class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.datetime :deadline, null: false
      t.integer :status, null: false
      t.references :user, foreignkey: true, null: false

      t.timestamps
    end
  end
end
