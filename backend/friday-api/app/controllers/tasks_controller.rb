class TasksController < ApplicationController
    def index 
        if params["project_id"]
            tasks = Task.where("project_id = ?", params["project_id"])
            render json: tasks, only: [:project_id, :content, :member_email, :completed, :id]
        else 
            render json: Task.all, only: [:project_id, :content, :member_email, :completed, :id]
        end 
    end

    def update
        # pry
        task = Task.find_by_id(params[:id])
        task.completed = params[:completed]["checkmark"]
        task.save 
        # render json: task, only: [:project_id, :content, :member_email, :completed, :id]
    end
end
