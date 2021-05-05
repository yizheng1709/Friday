class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.date :due_date
      t.string :group_supervisor
      t.boolean :completed, default: false
      


      t.timestamps
    end
  end
end
