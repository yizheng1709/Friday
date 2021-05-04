class TasksController < ApplicationController
    def index 
        if params["project_id"]
            tasks = Task.where("project_id = ?", params["project_id"])
            render json: tasks, only: [:content, :member_email, :completed, :project_id]
        end 
    end
end
