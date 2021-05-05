class TasksController < ApplicationController
    def index 
        if params["project_id"]
            tasks = Task.where("project_id = ?", params["project_id"])
            render json: tasks, only: [:project_id, :content, :member_email, :completed, :id]
        end 
    end
end
