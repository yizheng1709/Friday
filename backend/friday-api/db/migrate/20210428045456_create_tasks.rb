class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.references :project, null: false, foreign_key: true
      t.string :content
      t.string :member_email
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
