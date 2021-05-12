class Project < ApplicationRecord
    has_many :tasks, dependent: :destroy
    # def tasks_attributes=(task_hash)
    #     task_hash.values.each do |value|

    #     end
    # end
end
